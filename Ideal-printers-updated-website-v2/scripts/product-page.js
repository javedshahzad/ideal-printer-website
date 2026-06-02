

// function setRecommendProducts(){
//     let recommendProducts = JSON.parse(localStorage.getItem("recommend-products")) || []
//     // console.log(recommendProducts)
//     let recommendProductsDiv = document.getElementById("recommend-products-div")
//     if(recommendProducts.length < 6){
//         let cur_product_check = true;
//         for(i=0; i<recommendProducts.length; i++){
//             // console.log(recommendProducts[i],"p")
//             if(document.getElementById("product-name").innerText.trim() === recommendProducts[i].productName){
//                 cur_product_check = false;
//                 break;
//             }
//         }
//         if(cur_product_check){
//          let cur_product = {
//             productName: document.getElementById("product-name").innerText,
//             productImg: document.getElementById("product-img").src,
//             productLink : window.location.href,
//             }
//             recommendProducts.push(cur_product)
//             //  recommendProducts = products;
//             localStorage.setItem("recommend-products", JSON.stringify(recommendProducts))
//         }
       
//       }
//     if(recommendProducts.length > 0){
//       recommendProducts.forEach((el) => {
//         if(el.productName.trim() !== document.getElementById("product-name").innerText.trim() ){
//             // console.log(el.productName.trim() === document.getElementById("product-name").innerText.trim())
//             let productCart = document.createElement("a")
//             productCart.setAttribute("href",el.productLink)
//             let productDiv = document.createElement("div")
//             // productDiv.setAttribute("class","product-div")
//             let productName = document.createElement("h2")
//             productName.setAttribute("class","h6")
//             productName.innerText = el.productName;
//             let productImg = document.createElement("img")
//             productImg.style.width = "100%"
//             productImg.src = el.productImg;
//             let readBtn = document.createElement("button")
//             readBtn.innerHTML = ""
//             // console.log(productImg)
//             let recommendProductsHeading = document.getElementById("recommend-products-heading")
//             // recommendProducts.setAttribute("class","products-heading")
//             productDiv.append(productImg,productName)
//             productCart.append(productDiv)
//             recommendProductsDiv.append(productCart)
//             recommendProductsHeading.style.display = "block"
//             // recommendProductsHeading.display = "block"
//         }
        
        
//       });
//       // console.log(products)
//     }
  
// }
// setRecommendProducts()

function normalizeRecentProductLink(link) {
  if (!link || typeof link !== "string") {
    return link;
  }

  return link
    .replace(/([\\/])([^\\/]+)-dubai\.html(?=([#?].*)?$)/i, "$1$2.html")
    .replace(/([\\/])(advertising_flags|blade_flags|body_flags|car_desert_flags|car_flags|conference_flags|conference_hanging_flags|dashboard_flags|festival_flags|hand_held_flags|hand_waving_flags|hoisting_flags|l_shape_flags|pennant_flags|sail_flags|table_flags|tear_drop_flags|telescopic_flags|toothpick_flags|wall_mounted_flags)_dubai\.html(?=([#?].*)?$)/i, "$1$2.html");
}

function setRecommendProducts(){
  let recommendProducts = JSON.parse(sessionStorage.getItem("recommend-products")) || [];
  let recommendProductsChanged = false;

  recommendProducts = recommendProducts.map((product) => {
    const normalizedLink = normalizeRecentProductLink(product.productLink);
    if (normalizedLink !== product.productLink) {
      recommendProductsChanged = true;
      return {
        ...product,
        productLink: normalizedLink,
      };
    }
    return product;
  });
  
let category = JSON.parse(localStorage.getItem("category")) || [];

// Select all breadcrumb items
const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');

// Check if there are at least two breadcrumb items and get the second one
if (breadcrumbItems.length > 1) {
  // Select the anchor tag inside the second breadcrumb item
  const secondBreadcrumbLink = breadcrumbItems[1].querySelector('a');
  
  if (secondBreadcrumbLink) {
    const textContent = secondBreadcrumbLink.textContent.trim();
    console.log('Text content of second breadcrumb anchor:', textContent);
    localStorage.setItem("category", JSON.stringify(textContent));  // Corrected this line
  }
}

let categoryString = localStorage.getItem("category");

// Check if the retrieved value is a valid JSON string
try {
  let category = JSON.parse(categoryString);
  console.log(category); // Log the parsed value
} catch (e) {
  console.error("Invalid JSON in localStorage:", e);
}


  // console.log(recommendProducts)
  let recommendProductsDiv = document.getElementById("recommend-products-div");
  if(recommendProducts.length < 6){
      let cur_product_check = true;
      for(i=0; i<recommendProducts.length; i++){
          // console.log(recommendProducts[i],"p")
          if(document.getElementById("product-name").innerText.trim() === recommendProducts[i].productName){
              cur_product_check = false;
              break;
          }
      }
      if(cur_product_check){
          let cur_product = {
              productName: document.getElementById("product-name").innerText,
              productImg: document.getElementById("product-img").src,
              productLink : normalizeRecentProductLink(window.location.href),
          };
          recommendProducts.push(cur_product);
          recommendProductsChanged = true;
      }

      if (recommendProductsChanged) {
          sessionStorage.setItem("recommend-products", JSON.stringify(recommendProducts));
      }
  }

  if (recommendProductsChanged && recommendProducts.length >= 6) {
      sessionStorage.setItem("recommend-products", JSON.stringify(recommendProducts));
  }

  if(recommendProducts.length > 0){
      recommendProducts.forEach((el) => {
          if(el.productName.trim() !== document.getElementById("product-name").innerText.trim() ){
              // console.log(el.productName.trim() === document.getElementById("product-name").innerText.trim())
              let productCart = document.createElement("a");
              productCart.setAttribute("href", normalizeRecentProductLink(el.productLink));
              let productDiv = document.createElement("div");
              // productDiv.setAttribute("class","product-div")
              let productName = document.createElement("h4");
              productName.style.textAlign = "center";
              productName.setAttribute("class","h6");
              productName.innerText = el.productName;
              let productImg = document.createElement("img");
              productImg.style.width = "100%";
              productImg.src = el.productImg;
              let readBtn = document.createElement("button");
              readBtn.innerHTML = "";
              // console.log(productImg)
              let recommendProductsHeading = document.getElementById("recommend-products-heading");
              // recommendProducts.setAttribute("class","products-heading")
              productDiv.append(productImg,productName);
              productCart.append(productDiv);
              recommendProductsDiv.append(productCart);
              recommendProductsHeading.style.display = "block";
              // recommendProductsHeading.display = "block"
          }
      });
      // console.log(products)
  }
}

setRecommendProducts();

function initProductImageGalleries() {
  const galleries = document.querySelectorAll(".fotorama.grumpy-image-wrapper");

  galleries.forEach((gallery) => {
    if (gallery.dataset.productGalleryReady === "true") {
      return;
    }

    const images = Array.from(gallery.querySelectorAll("img"))
      .map((img) => ({
        src: img.getAttribute("src"),
        alt: img.getAttribute("alt") || "",
        id: img.id || "",
      }))
      .filter((img) => img.src);

    if (images.length < 2) {
      return;
    }

    gallery.dataset.productGalleryReady = "true";
    gallery.classList.remove("fotorama");
    gallery.classList.add("product-gallery");
    gallery.replaceChildren();

    const main = document.createElement("div");
    main.className = "product-gallery-main";

    const mainImage = document.createElement("img");
    mainImage.src = images[0].src;
    mainImage.alt = images[0].alt;
    if (images[0].id) {
      mainImage.id = images[0].id;
    }
    main.appendChild(mainImage);

    const thumbs = document.createElement("div");
    thumbs.className = "product-gallery-thumbs";

    const prevButton = document.createElement("button");
    prevButton.type = "button";
    prevButton.className = "product-gallery-arrow prev";
    prevButton.setAttribute("aria-label", "Previous product images");
    prevButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.className = "product-gallery-arrow next";
    nextButton.setAttribute("aria-label", "Next product images");
    nextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

    const viewport = document.createElement("div");
    viewport.className = "product-gallery-thumbs-viewport";

    const track = document.createElement("div");
    track.className = "product-gallery-thumbs-track";

    viewport.appendChild(track);
    thumbs.append(prevButton, viewport, nextButton);
    gallery.append(main, thumbs);

    let activeIndex = 0;
    let thumbOffset = 0;
    const thumbButtons = [];

    function visibleThumbs() {
      return window.innerWidth < 768 ? 2 : 4;
    }

    function updateThumbOffset() {
      const step = thumbButtons[0] ? thumbButtons[0].getBoundingClientRect().width + 8 : 0;
      track.style.transform = `translateX(-${thumbOffset * step}px)`;
      prevButton.disabled = thumbOffset === 0;
      nextButton.disabled = thumbOffset >= Math.max(0, images.length - visibleThumbs());
    }

    function setActive(index) {
      activeIndex = index;
      const image = images[index];
      mainImage.src = image.src;
      mainImage.alt = image.alt;

      thumbButtons.forEach((button, buttonIndex) => {
        button.classList.toggle("is-active", buttonIndex === index);
      });

      const maxOffset = Math.max(0, images.length - visibleThumbs());
      if (activeIndex < thumbOffset) {
        thumbOffset = activeIndex;
      } else if (activeIndex >= thumbOffset + visibleThumbs()) {
        thumbOffset = Math.min(maxOffset, activeIndex - visibleThumbs() + 1);
      }

      updateThumbOffset();
    }

    images.forEach((image, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "product-gallery-thumb";
      button.setAttribute("aria-label", `View product image ${index + 1}`);

      const thumbImage = document.createElement("img");
      thumbImage.src = image.src;
      thumbImage.alt = image.alt;
      button.appendChild(thumbImage);

      button.addEventListener("click", function () {
        setActive(index);
      });

      track.appendChild(button);
      thumbButtons.push(button);
    });

    prevButton.addEventListener("click", function () {
      thumbOffset = Math.max(0, thumbOffset - 1);
      updateThumbOffset();
    });

    nextButton.addEventListener("click", function () {
      thumbOffset = Math.min(Math.max(0, images.length - visibleThumbs()), thumbOffset + 1);
      updateThumbOffset();
    });

    window.addEventListener("resize", function () {
      thumbOffset = Math.min(thumbOffset, Math.max(0, images.length - visibleThumbs()));
      updateThumbOffset();
    });

    setActive(0);
  });
}

function initRelatedProductsCarousels() {
  const swiperRoots = document.querySelectorAll(".swiper.mySwiper");

  swiperRoots.forEach((root) => {
    const track = root.querySelector(".swiper-wrapper");
    const slides = track ? Array.from(track.querySelectorAll(".swiper-slide")) : [];
    const heading = root.parentElement ? root.parentElement.querySelector(".products-heading") : null;
    const headingText = heading ? heading.textContent.trim().toLowerCase() : "";
    const looksLikeRelatedProducts =
      headingText === "related products" &&
      slides.length > 0 &&
      slides.every((slide) => slide.querySelector(".product-card"));

    if (
      !track ||
      slides.length === 0 ||
      root.dataset.relatedCarouselReady === "true" ||
      !looksLikeRelatedProducts
    ) {
      return;
    }

    root.dataset.relatedCarouselReady = "true";
    root.classList.add("related-products-carousel");

    const oldPrev = root.querySelector(".swiper-button-prev");
    const oldNext = root.querySelector(".swiper-button-next");
    oldPrev?.remove();
    oldNext?.remove();

    root.classList.remove("swiper", "mySwiper", "swiper-initialized", "swiper-horizontal", "swiper-backface-hidden");
    root.style.removeProperty("overflow");

    track.classList.add("related-products-track");
    track.style.removeProperty("transform");
    track.style.removeProperty("transition-duration");

    slides.forEach((slide) => {
      slide.style.removeProperty("width");
      slide.style.removeProperty("margin-right");
    });

    let viewport = root.querySelector(".related-products-viewport");
    if (!viewport) {
      viewport = document.createElement("div");
      viewport.className = "related-products-viewport";
      root.insertBefore(viewport, track);
      viewport.appendChild(track);
    }

    let prevButton = root.querySelector(".related-products-arrow.prev");
    let nextButton = root.querySelector(".related-products-arrow.next");

    if (!prevButton) {
      prevButton = document.createElement("button");
      prevButton.type = "button";
      prevButton.className = "related-products-arrow prev";
      prevButton.setAttribute("aria-label", "Previous related products");
      prevButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
      root.insertBefore(prevButton, viewport);
    }

    if (!nextButton) {
      nextButton = document.createElement("button");
      nextButton.type = "button";
      nextButton.className = "related-products-arrow next";
      nextButton.setAttribute("aria-label", "Next related products");
      nextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
      root.appendChild(nextButton);
    }

    let currentIndex = 0;

    function getVisibleCount() {
      return window.innerWidth < 768 ? 2 : 4;
    }

    function getGap() {
      const styles = window.getComputedStyle(track);
      return parseFloat(styles.columnGap || styles.gap || "0");
    }

    function updateCarousel() {
      const visibleCount = getVisibleCount();
      const maxIndex = Math.max(0, slides.length - visibleCount);
      currentIndex = Math.min(currentIndex, maxIndex);

      const slideWidth = slides[0] ? slides[0].getBoundingClientRect().width : 0;
      const offset = currentIndex * (slideWidth + getGap());
      track.style.transform = `translateX(-${offset}px)`;

      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex >= maxIndex;
    }

    prevButton.addEventListener("click", function () {
      const step = getVisibleCount();
      currentIndex = Math.max(0, currentIndex - step);
      updateCarousel();
    });

    nextButton.addEventListener("click", function () {
      const step = getVisibleCount();
      const maxIndex = Math.max(0, slides.length - getVisibleCount());
      currentIndex = Math.min(maxIndex, currentIndex + step);
      updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
    updateCarousel();
  });
}

initProductImageGalleries();
initRelatedProductsCarousels();



// code for tabs 
function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
// openCity("click","price")


// tabs
jQuery(document).ready(function($) {
  // Starting condition when page loads
  $('.tabs-stage div').hide();
  $('.tabs-stage div:first').show();
  $('.tabs-stage div:first').addClass('active');
  $('.product-tabs-nav li:first').addClass('tab-active');
  
  // condition for tab click
  $('.product-tabs-nav a').on('click', function(event){
    event.preventDefault();
    $('.product-tabs-nav li').removeClass('tab-active');
    $(this).parent().addClass('tab-active');
    $('.tabs-stage div').hide();
    $('.tabs-stage div').removeClass('active');
    $($(this).attr('href')).addClass('active');
    $($(this).attr('href')).fadeIn();
  });
  });


  
  function toggleDropdown(dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
    } else {
        // Close all other dropdowns
        var dropdowns = document.getElementsByClassName("btn-dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove("show");
        }
        dropdown.classList.add("show");
}

function selectItem(buttonId, itemName, itemImage) {
    document.getElementById(buttonId).innerHTML = itemName + ` <i style="pointer-events: none; background-color: lightgray; border-radius: 3px; padding: 5px 2px; color: gray;" class="fa-solid fa-caret-down"></i>`;
    var dropdown = document.getElementById(buttonId).nextElementSibling;
    dropdown.classList.remove("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("btn-dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}}


// before/after image slider
const container = document.querySelector('.container-ab');
document.querySelector('.slider-ab').addEventListener('input', (e) => {
  container.style.setProperty('--position', `${e.target.value}%`);
})


    

