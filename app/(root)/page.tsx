import { Button } from "@/components/ui/button";
import { getAllPackets } from "@/lib/actions/packet.actions";
import { SearchParamProps } from '@/types';
import Image from "next/image";
import Link from "next/link";
import PacketCollection from "@/components/shared/PacketCollection";
import { getAllProducts } from "@/lib/actions/product.actions";
import { getAllGears } from "@/lib/actions/gear.actions";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { faqList } from "@/constants";
import ProductCollection from "@/components/shared/ProductCollection";
import GearCollection from "@/components/shared/GearCollection";
  
export default async function Home({ searchParams }: SearchParamProps) {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';

    const packets = await getAllPackets({
        query: searchText,
        category,
        page,
        limit: 3
    })
    const products = await getAllProducts({
        query: searchText,
        category,
        page,
        limit: 5
    })
    const gears = await getAllGears({
        query: searchText,
        category,
        page,
        limit: 5
    })

    return (
        <>
            {/* HERO SECTION */}
            <section className="bg-grey-100/50 bg-dotted-pattern bg-contain overflow-hidden">
                <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
                    <div className="flex flex-col justify-center gap-8">
                        <h1 className="h1-bold text-secondary-300 font-playfair" data-aos="fade-right">
                            Make your dream wedding come true with us!
                        </h1>
                        <p className="p-regular-20 md:p-regular-24 text-primary-300" data-aos="fade-right" data-aos-delay="150">
                        Find a wedding organizer vendor that suits your dream wedding event without having to think about unnecessary things
                        </p>
                        <Button size="lg" asChild className="button w-full sm:w-fit bg-primary-300 text-white font-black" data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-delay="300">

                            <Link href="#packets">Explore Now</Link>
                        </Button>
                    </div>
                    <Image
                        data-aos="fade-left"
                        src="/assets/images/flower.png"
                        alt="flower"
                        width={1200}
                        height={1200}
                        className="max-h-[70vh] object-contain object-center 2xl:max-h-[80vh]"
                    />
                </div>
            </section>

            {/* GALLERY DECORATION */}
            <section className="flex items-center justify-center -z-[1] pb-0">
                <div className="flex items-end justify-center justify-items-center py-0 md:py-5 relative scale-[40%] sm:scale-50 md:scale-75 lg:scale-100">
                    <Image className="overflow-hidden border-8 border-white object-cover w-[250px] h-[250px] rounded-tl-[250px] absolute -left-[300px] z-[1]" src={`/assets/images/image-1.jpg`} width={200} height={200} alt="gallery_images" data-aos="fade-up-right" data-aos-delay="200"/>
                    <Image className="overflow-hidden border-8 border-white object-cover w-[200px] h-[300px] rounded-tl-[250px] absolute -left-[150px] z-[2]" src={`/assets/images/image-2.jpg`} width={200} height={200} alt="gallery_images" data-aos="fade-up-right" data-aos-delay="100"/>
                    <Image className="overflow-hidden border-8 border-white object-cover w-[250px] h-[350px] rounded-t-[250px] z-[3]" src={`/assets/images/image-3.jpg`} width={200} height={200} alt="gallery_images" data-aos="fade-up"/>
                    <Image className="overflow-hidden border-8 border-white object-cover w-[200px] h-[300px] rounded-tr-[250px] absolute -right-[150px] z-[2]" src={`/assets/images/image-4.jpg`} width={200} height={200} alt="gallery_images" data-aos="fade-up-left" data-aos-delay="100"/>
                    <Image className="overflow-hidden border-8 border-white object-cover w-[250px] h-[250px] rounded-tr-[250px] absolute -right-[300px] z-[1]" src={`/assets/images/image-5.jpg`} width={200} height={200} alt="gallery_images" data-aos="fade-up-left" data-aos-delay="200"/>
                </div>
            </section>

            {/* PACKETS DISPLAY SECTION */}
            <section id="packets" className="wrapper my-8 flex flex-col gap-5 md:gap-12">
                <h2 className="h2-bold text-center text-secondary-300 font-playfair">Trusted by <br/> Thousands of Customers</h2>
                <PacketCollection
                data={packets?.data}
                emptyTitle="No Packets Found"
                emptyStateSubtext="Check later"
                collectionType="Sample_Packets"
                limit={3}
                page={page}
                totalPages={packets?.totalPages}
                />
            </section>
        
            {/* MILESTONE */}

            <section className="relative flex items-center justify-center flex-col gap-y-7 bg-grey-100 py-14 md:py-10 overflow-hidden" id="about">
                <div className="relative sm:absolute" data-aos="fade-up">
                    {/* Border Center Image */}
                    <div className="absolute -inset-[25px] w-[300px] h-[400px] rounded-[200px] opacity-70 border-y-4 border-y-primary-300 md:w-[400px] md:h-[550px]"></div>

                    {/* Center Image */}
                    <Image
                    src={"/assets/images/image-2.jpg"}
                    className="w-[250px] h-[350px] rounded-[200px] overflow-hidden md:w-[350px] md:h-[500px]"
                    alt="center image"
                    width={300}
                    height={300}
                    />
                </div>
                <div className="grid items-center justify-center grid-cols-2 grid-rows-4 gap-x-[0px] gap-y-[0px] md:gap-x-[450px] md:gap-y-[20px] sm:gap-y-[0px] sm:gap-x-[300px]">
                    <div className="w-[150px] h-[110px] p-4 flex flex-col items-center justify-start text-secondary-300" data-aos="fade-right">
                        <div className="text-4xl font-bold flex relative">
                            20<span className="text-sm absolute -right-4">th</span>
                        </div>
                        <div className="text-base md:text-clip leading-5 text-center">years of existence</div>
                    </div>
                    <div className="w-[150px] h-[110px] p-4 flex flex-col items-center justify-start text-secondary-300" data-aos="fade-left">
                        <div className="text-4xl font-bold flex relative">
                            7500<span className="text-base absolute -right-3">+</span>
                        </div>
                        <div className="text-base leading-5 text-center">supported events</div>
                    </div>
                    <div className="w-[150px] h-[110px] p-4 flex flex-col items-center justify-start text-secondary-300" data-aos="fade-right">
                        <div className="text-4xl font-bold flex relative">
                            350<span className="text-base absolute -right-3">+</span>
                        </div>
                        <div className="text-base leading-5 text-center">wedding package</div>
                    </div>
                    <div className="w-[150px] h-[110px] p-4 flex flex-col items-center justify-start text-secondary-300" data-aos="fade-left">
                        <div className="text-4xl font-bold flex relative">
                            70<span className="text-base absolute -right-3">+</span>
                        </div>
                        <div className="text-base leading-5 text-center">vendors</div>
                    </div>
                    <div className="w-[150px] h-[110px] p-4 flex flex-col items-center justify-start text-secondary-300" data-aos="fade-right">
                        <div className="text-4xl font-bold flex relative">
                            120<span className="text-base absolute -right-3">+</span>
                        </div>
                        <div className="text-base leading-5 text-center">event themes</div>
                    </div>
                    <div className="w-[150px] h-[110px] p-4 flex flex-col items-center justify-start text-secondary-300" data-aos="fade-left">

                        <div className="text-4xl font-bold flex relative">
                            150<span className="text-base absolute -right-3">+</span>
                        </div>
                        <div className="text-base leading-5 text-center">event tool types</div>
                    </div>
                    <div className="w-[150px] h-[110px] p-4 flex flex-col items-center justify-start text-secondary-300" data-aos="fade-right">
                        <div className="text-4xl font-bold flex relative">
                            180<span className="text-base absolute -right-3">+</span>
                        </div>
                        <div className="text-base leading-5 text-center">venues</div>
                    </div>
                    <div className="w-[150px] h-[110px] p-4 flex flex-col items-center justify-start text-secondary-300" data-aos="fade-left">
                        <div className="text-4xl font-bold flex relative">
                            100<span className="text-base absolute -right-3">+</span>
                        </div>
                        <div className="text-base leading-5 text-center">tips & tricks</div>
                    </div>
                </div>
            </section>

            {/* PRODUCTS DISPLAY SECTION */}
            <section className="wrapper my-8 flex flex-col gap-5 md:gap-12">
                <h2 className="h2-bold text-center text-secondary-300 font-playfair">~ Products ~</h2>

                <ProductCollection
                data={products?.data}
                emptyTitle="No Products Found"
                emptyStateSubtext="Check later"
                collectionType="Sample_Products"
                limit={3}
                page={page}
                totalPages={products?.totalPages}
                />
            </section>

            {/* GEARS DISPLAY SECTION */}

            <section className="wrapper my-8 flex flex-col gap-5 md:gap-12">
                <h2 className="h2-bold text-center text-secondary-300 font-playfair">~ Gears ~</h2>

                <GearCollection
                data={gears?.data}
                emptyTitle="No Gears Found"
                emptyStateSubtext="Check later"
                collectionType="Sample_Gears"
                limit={5}
                page={page}
                totalPages={gears?.totalPages}
                />
            </section>

            {/* FAQ SECTION */}
            <section className="flex items-center justify-center flex-col py-10 gap-5">

                <h2 className="h2-bold text-center text-secondary-300 font-playfair">FAQs</h2>

                <Accordion type="single" collapsible defaultValue={faqList[0].index} className="flex justify-center flex-col gap-5 px-5 sm:px-20 w-full sm:w-[80%]">
                    {faqList.map((item) => {
                        return (
                            <AccordionItem value={item.index}>
                                <AccordionTrigger className=" text-primary-500">{item.quest}</AccordionTrigger>
                                <AccordionContent className=" text-primary-400">{item.answer}</AccordionContent>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            </section>

            {/* FOOTER MAIN PAGE */}
            <section className="flex items-end justify-center bg-grey-100">
                <div className="py-3 md:pt-6 md:pb-12 relative flex justify-center">
                    <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center rounded-full bg-white z-[2]">
                        <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] rounded-full border-t-4 border-b-4 border-amber-500 flex items-center justify-center flex-col">
                            <h5 className="text-xs sm:text-base md:text-lg font-playfair">wedding organizer</h5>
                            <Image
                                src={"/assets/images/text_logo.png"}
                                className="object-contain scale-[0.7] sm:scale-75 md:scale-100"
                                alt="text logo"
                                width={300}
                                height={50}
                                />
                            </div>
                            <div className="absolute flex items-center justify-center w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]">
                                <Image
                                src={"/assets/images/clover.png"}
                                className="absolute object-contain -top-16 -right-14 sm:-top-6  sm:-right-6 rotate-[150deg] scale-[0.35] sm:scale-50 md:scale-100"
                                alt="clover"
                                width={180}
                                height={300}
                                />
                                <Image
                                src={"/assets/images/clover.png"}
                                className="absolute object-contain -bottom-16 -left-14 sm:-bottom-6  sm:-left-6 -rotate-[30deg] scale-[0.35] sm:scale-50 md:scale-100"
                                alt="clover"
                                width={180}
                                height={300}
                                />
                        </div>
                    </div>
                    <div className="absolute bottom-0 hidden md:block w-[500px] h-[300px] z-[1] bg-primary-300"></div>
                </div>
            </section>
        </>
    );
}
