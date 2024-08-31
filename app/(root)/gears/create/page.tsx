import GearForm from "@/components/shared/GearForm"
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs"
import Image from "next/image";
import Link from "next/link";

const CreateGear = () => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
 
    return (
        <>
            <section className="bg-grey-100 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className='h3-bold text-center sm:text-left text-primary-500'>Create Gear</h3>
                    <Button size="lg" className="button-ic">
                        <Link href="/profile">
                            Back
                        </Link>
                    </Button>
                </div>
            </section>

            <div className="wrapper my-8">
                <GearForm userId={userId} type="Create"/>
            </div>
        </>
    )
}

export default CreateGear
