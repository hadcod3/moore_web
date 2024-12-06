
export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Packets',
      route: '/packets',
    },
    {
      label: 'Products',
      route: '/products',
    },
    {   
      label: 'Gears',
      route: '/gears',
    },
    {   
      label: 'Vendors',
      route: '/vendors',
    },
    {
      label: 'Profile',
      route: '/profile',
    },
]

export const faqList = [
    {
        index: 'faq-1',
        quest: 'Apa saja layanan yang disediakan oleh wedding organizer?',
        answer: 'Wedding organizer menyediakan berbagai layanan untuk memastikan pernikahan berjalan lancar dan sesuai dengan harapan. Layanan ini termasuk perencanaan konsep dan tema pernikahan, koordinasi vendor seperti catering, dekorasi, fotografi, dan musik, serta manajemen anggaran dan jadwal. Mereka juga menawarkan konsultasi untuk membantu pasangan menentukan detail penting, serta mengurus perizinan dan dokumen pernikahan jika diperlukan. Selain itu, pada hari H, wedding organizer bertanggung jawab untuk mengkoordinasikan semua elemen acara agar berjalan sesuai rencana tanpa hambatan.'
    },
    {
        index: 'faq-2',
        quest: 'Berapa biaya yang biasanya dikenakan oleh wedding organizer?',
        answer: 'Biaya wedding organizer bervariasi tergantung pada skala acara, kompleksitas, dan layanan yang dipilih. Umumnya, wedding organizer menetapkan tarif berdasarkan persentase dari total anggaran pernikahan, atau dengan tarif tetap yang sudah disepakati. Paket dasar bisa dimulai dari beberapa juta rupiah, sementara paket yang lebih lengkap dan mewah bisa mencapai puluhan juta rupiah. Penting untuk berdiskusi secara detail dengan wedding organizer mengenai anggaran dan layanan apa saja yang termasuk dalam biaya tersebut untuk menghindari biaya tambahan yang tak terduga.'
    },
    {
        index: 'faq-3',
        quest: 'Kapan waktu yang tepat untuk mulai menggunakan jasa wedding organizer?',
        answer: 'Sebaiknya pasangan mulai menggunakan jasa wedding organizer segera setelah menetapkan tanggal pernikahan, idealnya 12 hingga 18 bulan sebelum hari H. Ini memberikan waktu yang cukup bagi wedding organizer untuk merencanakan dan mengatur semua detail secara mendalam dan menyeluruh. Dengan memulai lebih awal, pasangan dan wedding organizer dapat bekerja sama dengan tenang untuk memilih vendor terbaik, menemukan lokasi yang sesuai, dan memastikan semua aspek pernikahan sesuai dengan keinginan pasangan tanpa tekanan waktu yang berlebihan.'
    },
    {
        index: 'faq-4',
        quest: 'Bagaimana cara memilih wedding organizer yang tepat?',
        answer: 'Memilih wedding organizer yang tepat memerlukan riset dan pertimbangan matang. Langkah pertama adalah mencari rekomendasi dari teman, keluarga, atau ulasan online. Kemudian, buat daftar pendek dan jadwalkan pertemuan dengan beberapa wedding organizer untuk mendiskusikan visi dan kebutuhan pernikahan Anda. Perhatikan portofolio mereka, gaya komunikasi, dan kemampuan mereka dalam memahami serta mewujudkan keinginan Anda. Pastikan juga untuk memeriksa lisensi dan kredibilitas mereka. Kesepakatan tertulis mengenai layanan dan biaya sangat penting untuk menghindari kesalahpahaman di kemudian hari.'
    },
    {
        index: 'faq-5',
        quest: 'Apa keuntungan utama menggunakan jasa wedding organizer?',
        answer: 'Keuntungan utama menggunakan jasa wedding organizer adalah mengurangi stres dan memastikan semua aspek pernikahan berjalan lancar. Wedding organizer memiliki pengalaman dan koneksi dengan berbagai vendor, sehingga dapat menghemat waktu dan sering kali juga biaya. Mereka mampu mengelola logistik yang kompleks, menangani detail administrasi, dan memastikan bahwa setiap elemen acara sesuai dengan keinginan pasangan. Selain itu, pada hari pernikahan, wedding organizer bertanggung jawab penuh untuk mengoordinasikan semua aspek acara, sehingga pasangan dan keluarga dapat menikmati hari istimewa mereka tanpa harus khawatir tentang masalah teknis atau kendala lainnya.'

    },
]

export const imageList = [
    {
        alt: 'image-1',
        imageLoc: 'image-1.jpg'
    },
    {
        alt: 'image-2',
        imageLoc: 'image-2.jpg'
    },
    {
        alt: 'image-3',
        imageLoc: 'image-3.jpg'
    },
    {
        alt: 'image-4',
        imageLoc: 'image-4.jpg'
    },
    {
        alt: 'image-5',
        imageLoc: 'image-5.jpg'
    },
]
  
export const itemDefaultValues = {
    type: '',
    name: '',
    description: '',
    imageUrl: '',
    price: 0,
    stock: 0,
    minOrder: 0,
    category: '',
    organizer: ''
}

// export const termsCondition = (
//       <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md text-gray-800">
//         <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
//         <p className="mb-4">
//           Welcome to the Wedding Organizer Marketplace. By registering as a vendor on our platform, you agree to the following terms and conditions. Please read them carefully.
//         </p>
  
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold mb-2">1. Vendor Eligibility</h2>
//           <ul className="list-disc pl-6">
//             <li>1.1. Vendors must be at least 18 years old to register.</li>
//             <li>1.2. Vendors must provide accurate and truthful information during registration.</li>
//           </ul>
//         </div>
  
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold mb-2">2. Use of the Platform</h2>
//           <ul className="list-disc pl-6">
//             <li>2.1. Vendors are responsible for the content, pricing, and availability of their listings.</li>
//             <li>2.2. Vendors must ensure that their products and services comply with local laws and regulations.</li>
//             <li>2.3. Vendors agree not to use the platform for any illegal, fraudulent, or harmful activities.</li>
//           </ul>
//         </div>
  
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold mb-2">3. Payments and Fees</h2>
//           <ul className="list-disc pl-6">
//             <li>3.1. A commission fee of [X%] will be deducted from each transaction.</li>
//             <li>3.2. Payments to vendors will be processed within [X] business days after successful transactions.</li>
//           </ul>
//         </div>
  
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold mb-2">4. Cancellation and Refunds</h2>
//           <ul className="list-disc pl-6">
//             <li>4.1. Vendors must provide clear cancellation and refund policies in their listings.</li>
//             <li>4.2. Vendors are responsible for resolving disputes with customers regarding cancellations or refunds.</li>
//           </ul>
//         </div>
  
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold mb-2">5. Intellectual Property</h2>
//           <ul className="list-disc pl-6">
//             <li>5.1. Vendors grant the marketplace a non-exclusive license to use product images, descriptions, and other content for marketing and promotional purposes.</li>
//             <li>5.2. Vendors must own or have the legal right to use the content they upload.</li>
//           </ul>
//         </div>
  
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold mb-2">6. Termination</h2>
//           <ul className="list-disc pl-6">
//             <li>6.1. The marketplace reserves the right to terminate vendor accounts for violations of these terms.</li>
//             <li>6.2. Vendors may deactivate their accounts at any time, but outstanding obligations must be fulfilled.</li>
//           </ul>
//         </div>
  
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold mb-2">7. Liability</h2>
//           <ul className="list-disc pl-6">
//             <li>7.1. The marketplace is not liable for disputes between vendors and customers.</li>
//             <li>7.2. The marketplace does not guarantee the accuracy or completeness of vendor listings.</li>
//           </ul>
//         </div>
  
//         <p className="italic mb-4">
//           By agreeing to these terms, you acknowledge that you have read, understood, and accepted them in their entirety.
//         </p>
  
//         <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
  
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold mb-2">1. Information We Collect</h2>
//           <ul className="list-disc pl-6">
//             <li>1.1. Personal Information: Name, email, phone number, and address.</li>
//             <li>1.2. Business Information: Business name, description, product or service details.</li>
//             <li>1.3. Payment Information: Bank account details for payouts.</li>
//           </ul>
//         </div>
  
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold mb-2">2. How We Use Your Information</h2>
//           <ul className="list-disc pl-6">
//             <li>2.1. To verify your identity and eligibility as a vendor.</li>
//             <li>2.2. To process transactions and payouts.</li>
//             <li>2.3. To communicate important updates and promotional offers.</li>
//             <li>2.4. To improve the functionality of the platform.</li>
//           </ul>
//         </div>
  
//         <p className="text-sm mt-4 text-gray-600">
//           For questions or concerns, please contact <a href="mailto:support@example.com" className="text-blue-600 underline">support@example.com</a>.
//         </p>
//       </div>
//     );


  