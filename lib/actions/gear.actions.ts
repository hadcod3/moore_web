'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database'  
import Gear from '../database/models/gear.model'
import User from '@/lib/database/models/user.model'
import { GearCategory } from '@/lib/database/models/category.model'
import { handleError } from '@/lib/utils'
import { 
    CreateGearParams,
    UpdateGearParams,
    DeleteGearParams,
    GetAllGearsParams,
    GetGearsByUserParams,
    GetRelatedGearsByCategoryParams,
} from '@/types'

const getCategoryByName = async (name: string) => {
    return GearCategory.findOne({ name: { $regex: name, $options: 'i' } })
}

const populateGear = (query: any) => {
    return query
    .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
    .populate({ path: 'category', model: GearCategory, select: '_id name' })
  }

// CREATE
export async function createGear({ userId, gear, path }: CreateGearParams) {
    try {
      await connectToDatabase()

      const organizer = await User.findById(userId)
      if (!organizer) throw new Error('Organizer not found')
  
      const newGear = await Gear.create({ ...gear, category: gear.categoryId, path, organizer: userId })
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(newGear))
    } catch (error) {
      handleError(error)
    }
}
  
// UPDATE
export async function updateGear({ gear, path }: UpdateGearParams) {
    try {
      await connectToDatabase()
  
      const updatedGear = await Gear.findByIdAndUpdate(
        gear._id,
        { ...gear, path, category: gear.categoryId },
        { new: true }
      )
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(updatedGear))
    } catch (error) {
      handleError(error)
    }
}

// DELETE
export async function deleteGear({ gearId, path }: DeleteGearParams) {
  try {
    await connectToDatabase()

    const deletedGear = await Gear.findByIdAndDelete(gearId)
    if (deletedGear) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET ONE GEAR BY ID
export async function getGearById(gearId: string) {
    try {
      await connectToDatabase()
  
      const gear = await populateGear(Gear.findById(gearId))
  
      if (!gear) throw new Error('Gear not found')
  
      return JSON.parse(JSON.stringify(gear))
    } catch (error) {
      handleError(error)
    }
}

// GET ALL GEARS
export async function getAllGears({ query, limit = 6, category, page }: GetAllGearsParams) {
    try {
      await connectToDatabase()
  
      const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
      const categoryCondition = category ? await getCategoryByName(category) : null
      const conditions = {
        $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
      }

      const skipAmount = (Number(page) - 1) * limit
      const eventsQuery = Gear.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)

      const events = await populateGear(eventsQuery)
      const gearsCount = await Gear.countDocuments(conditions)
  
      return {
        data: JSON.parse(JSON.stringify(events)),
        totalPages: Math.ceil(gearsCount / limit),
      }
    } catch (error) {
      handleError(error)
    }
}

// GET RELATED GEAR: GEAR WITH SAME CATEGORY
export async function getRelatedGearsByCategory({
  categoryId,
  gearId,
  limit = 3,
  page = 1,
}: GetRelatedGearsByCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: gearId } }] }

    const gearsQuery = Gear.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const gears = await populateGear(gearsQuery)
    const gearsCount = await Gear.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(gears)), totalPages: Math.ceil(gearsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

// GET GEARS BY ORGANIZER
export async function getGearsByUser({ userId, limit = 6, page }: GetGearsByUserParams) {
    try {
      await connectToDatabase()
  
      const conditions = { organizer: userId }
      const skipAmount = (page - 1) * limit
  
      const gearsQuery = Gear.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const gears = await populateGear(gearsQuery)
      const gearsCount = await Gear.countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(gears)), totalPages: Math.ceil(gearsCount / limit) }
    } catch (error) {
      handleError(error)
    }
}
  