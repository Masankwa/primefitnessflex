document.addEventListener("DOMContentLoaded", () => {
    // === SLIDESHOW LOGIC ===
    let index = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.buttons button:first-child');
    const nextBtn = document.querySelector('.buttons button:last-child');

    let slideInterval = setInterval(nextSlide, 5000); // Auto-slide every 5s

    function showSlide(i) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[i].classList.add('active');
        dots[i].classList.add('active');
        index = i;
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        showSlide(index);
    }

    function prevSlide() {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            resetInterval();
        });
    });

    showSlide(index); // Initialize first slide


    // === PRODUCT LISTING LOGIC ===
    const products = [
        { name: "Neoprene Coated Dumbbell Hand Weight", price: "$16.50", img: "images/neoprene.jpg", link: "https://amzn.to/4iqyN4A" },
        { name: "Rubber Hex Dumbbell Hand Weight", price: "$16.17", img: "images/hexdumbell.jpg", link: "https://amzn.to/3YaBz77" },
        { name: "Bowflex SelectTech 552 Adjustable Dumbbells", price: "$379.99", img: "images/adjustabledumbell.jpg", link: "https://amzn.to/4itT6ya" },
        { name: " Cast Iron Kettlebell", price: "$33.59", img: "images/kettlebell.jpg", link: "https://amzn.to/4johd2G" },
        { name: "Resistance Loop Exercise Bands", price: "$8.98", img: "images/loopbands.jpg", link: "https://amzn.to/42BrtgQ" },
        { name: "WHATAFIT Tube Resistance Bands", price: "$26.97", img: "images/tubebands.jpg", link: "https://amzn.to/4lCEL5v" },
        { name: "FLYBIRD Adjustable Weight Bench", price: "$111.99", img: "images/adjbench.jpg", link: "https://amzn.to/4lHA1vk" },
        { name: "US Weight Barbell Weight Set", price: "$78.48", img: "images/weightset.jpg", link: "https://amzn.to/42LRzOp" },
        { name: "Ally Peaks Pull Up Bar", price: "$29.89", img: "images/pullbar.jpg", link: "https://amzn.to/4lVRSPo" },
        { name: "ProsourceFit Slam Medicine Balls", price: "$29.60", img: "images/medicineball.jpg", link: "https://amzn.to/4itW6ea" },
        { name: "HOTWAVE Push Up Board Fitness", price: "$31.99", img: "images/pushupboard.jpg", link: "https://amzn.to/43ZyaM0" },
        { name: "Smart Water Bottle with Reminder & Tracker", price: "$54.99", img: "images/smartbottle.jpg", link: "https://amzn.to/4inMCAV" },
        { name: "Ab Roller Wheel, Abs Workout Equipment ", price: "$14.99", img: "images/rollerwheel.jpg", link: "https://amzn.to/3EBEYFh" },
        { name: "5 in 1 Foam Roller Set ", price: "$36.99", img: "images/foamroller.jpg", link: "https://amzn.to/44zWjsI" }, 
        { name: "Vibration Plate Fitness Platform ", price: "$89.99", img: "images/vibrationplate.jpg", link: "https://amzn.to/4cDP6d6" },
        { name: "YOSUDA Indoor Cycling Bike ", price: "$249.99", img: "images/indoorbike.jpg", link: "https://amzn.to/42IP6nS" },
        { name: "Jump Rope, Tangle-Free Rapid Speed Jumping Rope ", price: "$8.99", img: "images/jumpingrope.jpg", link: "https://amzn.to/3YyKjEj" },
        { name: "Mini Stair Stepper with Resistance Bands ", price: "$59.99", img: "images/stairbands.jpg", link: "https://amzn.to/42JhDtt" },
        { name: "Mini Stair Stepper with Resistance Bands ", price: "$59.99", img: "images/stairbands.jpg", link: "https://amzn.to/42JhDtt" },
        { name: "WHOOP 4.0 - Wearable Health, Fitness & Activity Tracker ", price: "$239.00", img: "images/whoopwatch.jpg", link: "https://amzn.to/3GwVt5Y" },
        { name: "Extra Thick Exercise Yoga Mat  ", price: "$21.98", img: "images/yogamatt.jpg", link: "https://amzn.to/4lGXRHB" },
        { name: "FuelMeFoot 3 Pack Copper Compression Socks  ", price: "$14.99", img: "images/compressionsocks.jpg", link: "https://amzn.to/42oBBdV" }

    ];

    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("product-search");
    const prevPageBtn = document.getElementById("prev-page");
    const nextPageBtn = document.getElementById("next-page");
    const pageInfo = document.getElementById("shop-page-info");

    let currentPage = 1;
    const itemsPerPage = 10;

    function displayProducts() {
        productList.innerHTML = "";

        const filteredProducts = products.filter(p =>
            p.name.toLowerCase().includes(searchInput.value.toLowerCase())
        );

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageProducts = filteredProducts.slice(start, end);

        pageProducts.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("shop-item");
            productDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="shop-price">${product.price}</p>
                <a href="${product.link}" target="_blank" rel="noopener noreferrer">Get it on Amazon</a>
            `;
            productList.appendChild(productDiv);
        });

        pageInfo.innerText = `Page ${currentPage}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = end >= filteredProducts.length;
    }

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            currentPage = 1;
            displayProducts();
        });
    }

    if (prevPageBtn) {
        prevPageBtn.addEventListener("click", () => {
            currentPage--;
            displayProducts();
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener("click", () => {
            currentPage++;
            displayProducts();
        });
    }

    displayProducts(); // Initialize product listing
});
