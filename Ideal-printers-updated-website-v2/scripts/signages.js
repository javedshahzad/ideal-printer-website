if(document.getElementById("footer-div") !== null && document.getElementById("footer-div") !== undefined){
    const footerDiv = document.getElementById("footer-div")
    if (footerDiv.querySelector(".main-footer")) {
      return;
    }
  
  footerDiv.innerHTML=`
  <footer class="main-footer">
  <div class="container">
    <div id="footer">
    <div class="row">
      <div class="col-lg-3">
        <h4 class="footer-heading" style="font-weight: 700;">Ideal Printers</h4>
        <p>
                <i class="fa fa-location-arrow"></i> <strong>Sales Office / Factory</strong> 
                <p>
                  G-2, Al-Rehman Centre, Shama Metro Station, 70-Ferozepur Road, Lahore
                </p>
			  </p>
        <h4 class="footer-heading mt-3" style="font-weight: 700;">Follow Us</h4>
          <div class="social-custom" style="font-size: 18pt">
            <div class="d-inline-block mr-2"><a href="https://www.facebook.com/idealprinters41/" target="_blank"><i class="fa-brands fa-square-facebook facebook"></i></a></div>
            <div class="d-inline-block mr-2"><a href="#" target="_blank"><i class="fa-brands fa-square-instagram instagram"></i></a></div>
            <div class="d-inline-block mr-2"><a href="https://twitter.com/Muhamma51494191" target="_blank"><i class="fa-brands fa-square-x-twitter twitter"></i></a></div>
            <div class="d-inline-block mr-2"><a href="#" target="_blank"><i class="fa-brands fa-linkedin linkedin"></i></a></div>
            <div class="d-inline-block mr-2"><a href="#" target="_blank"><i class="fa-brands fa-youtube youtube"></i></a></div>
            <div class="d-inline-block mr-2"><a href="#" target="_blank"><i class="fa-brands fa-pinterest pinterest"></i></a></div>
          </div>
      </div>
      <div class="col-lg-3">
        <h4 class="footer-heading" style="font-weight: 700;">Contact Us</h4>
        <i class="fa fa-phone"></i> +92 42 3597 9285<br>
         <i class="fa fa-phone"></i> +92 30 0460 2749<br>
        <a href="mailto:idealprinter41@gmail.com"><i class="fa fa-envelope"></i>  idealprinter41@gmail.com</a> <br><br>
              <h4 class="footer-heading" style="font-weight: 700;">Working Hours</h4>
                     <p>9:00 am to 2:00 pm
              <br>
              3:00 pm to 10:00 pm
              <br>
              2:00 pm to 3:00 pm (Lunch Break)
              <br>
              Monday to Sunday
              </p>
              <!-- <img style="height: 150px; margin-top: -18px; margin-left: -25px;" src="images/Ramdan-timing.webp" alt="Ramdan Timing"> -->

        <hr class="d-block d-lg-none">
      </div>
      <div class="col-lg-3">
        <h4 class="footer-heading" style="font-weight: 700;">Quick Links</h4>
          <ul class="list-inline">
                  <li><a href="index.html"><i class="fa fa-caret-right"></i> Home </a></li>
                  <li><a href="about-company.html"><i class="fa fa-caret-right"></i> About Us </a></li>
                  <li><a href="portfolio.html"><i class="fa fa-caret-right"></i> Our Projects </a></li>
                  <li><a href="digital-printing-services.html"><i class="fa fa-caret-right"></i> Printing Services</a></li>
                  <li><a href="faq.html"><i class="fa fa-caret-right"></i> FAQs </a></li>
                  <li><a href="terms.html"><i class="fa fa-caret-right"></i> Terms </a></li>
                  <li><a href="privacy_policy.html"><i class="fa fa-caret-right"></i> Privacy </a></li>
                  <li><a href="contact-us.html"><i class="fa fa-caret-right"></i> Contact Us </a></li>
                </ul>
      </div>
      <div class="col-lg-3">				
        <h4 class="footer-heading" style="font-weight: 700;">Our Location</h4>
        <div class="img-fluid mb-3">
          <iframe style="border-radius: 10px; border:0;" src="https://www.google.com/maps?q=Ideal+Printers,+70-G-2,+Rehman+Center,+Road,+Ichhra,+Lahore,+Pakistan&output=embed" width="100%" height="170" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
    </div>
  </div>
  <div class="copyrights">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 text-center-md">
          <p>Copyright © 2026 Ideal Printers, All rights reserved.</p>
        </div>
        <div class="col-lg-4 text-center">
        <p>Developed with &hearts; By <a href="https://idealprinters.pk/" target="_blank" rel="noopener">Ideal Printers</a></p>
          <!-- Please do not remove the backlink to us unless you purchase the Attribution-free License at https://bootstrapious.com/donate. Thank you. -->
        </div>
      </div>
    </div>
  </div>
  <div class="modal ip-inquiry-modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5 h3" id="exampleModalLabel">Inquiry Form</h2>
          <button type="button" class="btn btn-close inquiry-close-btn" data-ip-inquiry-close aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form role="form" method="post" id="reused_form" style="width: 100%; padding: 0px;">
          <div class="style5">
            <div class="form-group">
              <input type="text" required name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
              <div class="validation"></div>
            </div>
            <div class="form-group">
              <input type="email" class="form-control" required name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
              <div class="validation"></div>
            </div>
            <div class="form-group">
              <input type="mobile" class="form-control" required name="mobile" id="mobile" placeholder="Your Contact Number" data-rule="minlen:4" data-msg="Please enter your contact number" />
              <div class="validation"></div>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" required name="requirement" id="requirement" placeholder="Required Item" data-rule="minlen:4" data-msg="Regarding Item" />
              <div class="validation"></div>
            </div>
            <div class="form-group">
              <textarea class="form-control" required name="message" rows="4" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
              <div class="validation"></div>
            </div>
            <div class="row">
              <div class="col-sm-12" style="left: 0px; top: 0px; width: 200px; height: auto;">
                <div style="width: 120px"><img src="form/captcha.jpg" id="captcha_image"/></div>
                <span><a id="captcha_reload" href="#" ><font size="2">Refresh</font></a></span>
                <div class="form-group">
                  <span><font size="2">Enter above text here:</font></span>
                  <input type="text" class="form-control" required id="captcha" name="captcha" style="width: 200px">
                </div>
              </div>
            </div>
            <div>
              <button type="submit" class="btn btn-template-main">Send Message</button></div>
            </div>
            </form>
  
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div> -->
      </div>
    </div>
  </div>
  </footer>
  
  
  <button onclick="topFunction()" id="back-to-top" title="Go to top">
    <i class="fa-solid fa-chevron-up"></i>
  </button>
  
  <a href="https://api.whatsapp.com/send?phone=+923004602749&text=Hello!" target="_blank"  id="fixed-whatsapp-icon" >
  <i class="fa-brands fa-whatsapp"></i>
  </a>
  `
  }
  

  // Whatsapp button animation
  var whatsappBtn = true;
  setInterval(function () {
    // console.log(whatsappBtn)
    var whatsapp = document.getElementById("fixed-whatsapp-icon");
    if(whatsappBtn){
      whatsapp.classList.add("shake-btn");
      whatsappBtn = false;
      // console.log("add", whatsappBtn)
    }
    else{
      whatsapp.classList.remove("shake-btn");
      whatsappBtn = true;
      // console.log("remove", whatsappBtn)
    }
  }, 3000);

  
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.body.style.transition=" all .5s"
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    document.documentElement.style.transition=" all .5s"
  }
  // Get the button:
  let mybutton = document.getElementById("back-to-top");
  // mybutton.style.color ="cyan"
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }





