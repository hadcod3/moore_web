'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database'
import Packet from '@/lib/database/models/packet.model'
import User from '@/lib/database/models/user.model'
import { PacketCategory } from '@/lib/database/models/category.model'
import { handleError } from '@/lib/utils'
import {
  CreatePacketParams,
  UpdatePacketParams,
  DeletePacketParams,
  GetAllPacketsParams,
  GetPacketsByUserParams,
  GetRelatedPacketsByCategoryParams,
} from '@/types'

const getCategoryByName = async (name: string) => {
  return PacketCategory.findOne({ name: { $regex: name, $options: 'i' } })
}

const populatePacket = (query: any) => {
    return query
    .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
    .populate({ path: 'category', model: PacketCategory, select: '_id name' })
}

// CREATE
export async function createPacket({ userId, packet, path }: CreatePacketParams) {
  try {
    await connectToDatabase()

    const organizer = await User.findById(userId)
    if (!organizer) throw new Error('Organizer not found')

    const newPacket = await Packet.create({ ...packet, category: packet.categoryId, path, organizer: userId })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newPacket))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updatePacket({ packet, path }: UpdatePacketParams) {
  try {
    await connectToDatabase()

    const updatedPacket = await Packet.findByIdAndUpdate(
      packet._id,
      { ...packet, path, category: packet.categoryId },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedPacket))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deletePacket({ packetId, path }: DeletePacketParams) {
  try {
    await connectToDatabase()

    const deletedPacket = await Packet.findByIdAndDelete(packetId)
    if (deletedPacket) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET ONE PACKET BY ID
export async function getPacketById(packetId: string) {
  try {
    await connectToDatabase()

    const packet = await populatePacket(Packet.findById(packetId))

    if (!packet) throw new Error('Packet not found')

    return JSON.parse(JSON.stringify(packet))
  } catch (error) {
    handleError(error)
  }
}

// GET ALL PACKETS
export async function getAllPackets({ query, limit = 6, page, category }: GetAllPacketsParams) {
  try {
    await connectToDatabase()

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    }

    const skipAmount = (Number(page) - 1) * limit
    const packetsQuery = Packet.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const packets = await populatePacket(packetsQuery)
    const packetsCount = await Packet.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(packets)),
      totalPages: Math.ceil(packetsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

// GET RELATED PACKET: PACKET WITH SAME CATEGORY
export async function getRelatedPacketsByCategory({
  categoryId,
  packetId,
  limit = 3,
  page = 1,
}: GetRelatedPacketsByCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: packetId } }] }

    const packetsQuery = Packet.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const packets = await populatePacket(packetsQuery)
    const packetsCount = await Packet.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(packets)), totalPages: Math.ceil(packetsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

// GET PACKETS BY ORGANIZER
export async function getPacketsByUser({ userId, limit = 6, page }: GetPacketsByUserParams) {
    try {
      await connectToDatabase()
  
      const conditions = { organizer: userId }
      const skipAmount = (page - 1) * limit
  
      const packetsQuery = Packet.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const packets = await populatePacket(packetsQuery)
      const packetsCount = await Packet.countDocuments(conditions)
  
      return { data: JSON.parse(JSON.stringify(packets)), totalPages: Math.ceil(packetsCount / limit) }
    } catch (error) {
      handleError(error)
    }
}