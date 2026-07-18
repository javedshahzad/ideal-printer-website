/** Local asset cache version: scripts/global-version.js — run `node tools/sync-global-version.mjs` after bumping. */

function navbar(){
  var navbarDiv = document.getElementById("navbar-div");
  if(!navbarDiv) return;

  navbarDiv.innerHTML = `

    <!-- ================================================================
         FIXED LEFT SIDEBAR with flyout sub-menus on hover
    ================================================================ -->
    <aside class="ip-sidebar" id="ip-sidebar" aria-label="Service categories">

      <!-- Logo -->
      <div class="ip-sidebar-logo-wrap">
        <a href="index.html" aria-label="Ideal Printers">
          <img src="images/ideal-printers-logo-horizontal.png"
               class="ip-sidebar-logo" alt="Ideal Printers">
        </a>
                <!-- Mobile hamburger (opens sidebar drawer) -->
      <div id="card-element" class="card">  
        <!-- Close Button -->
        <button id="my-close-btn" class="close-btn" aria-label="Close panel">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      </div>


      <!-- Category links -->
      <nav>
        <ul class="ip-sidebar-list">

            <li class="ip-sidebar-item" data-fly="fly-digital_printing_services">
              <a href="digital-printing-services.html" class="ip-sidebar-link">
                <i class="fa-solid fa-print"></i>
                <span>Print &amp; Marketing</span>
                <i class="fa-solid fa-chevron-right ip-sidebar-arrow"></i>
              </a>
            </li>
            <li class="ip-sidebar-item" data-fly="fly-fabric_and_fashion_printing">
              <a href="fabric-and-fashion-printing.html" class="ip-sidebar-link">
                <i class="fa-solid fa-shirt"></i>
                <span>Fashion &amp; Textile</span>
                <i class="fa-solid fa-chevron-right ip-sidebar-arrow"></i>
              </a>
            </li>
            <li class="ip-sidebar-item" data-fly="fly-office_store_branding_printing">
              <a href="office-store-branding-printing.html" class="ip-sidebar-link">
                <i class="fa-solid fa-store"></i>
                <span>Office &amp; Store Branding</span>
                <i class="fa-solid fa-chevron-right ip-sidebar-arrow"></i>
              </a>
            </li>
            <li class="ip-sidebar-item" data-fly="fly-signage_company_in">
              <a href="signage-company-in.html" class="ip-sidebar-link">
                <i class="fa-solid fa-sign-hanging"></i>
                <span>Signages</span>
                <i class="fa-solid fa-chevron-right ip-sidebar-arrow"></i>
              </a>
            </li>
            <li class="ip-sidebar-item" data-fly="fly-flags_printing_branding">
              <a href="flags-printing-branding.html" class="ip-sidebar-link">
                <i class="fa-solid fa-flag"></i>
                <span>Flags</span>
                <i class="fa-solid fa-chevron-right ip-sidebar-arrow"></i>
              </a>
            </li>
            <li class="ip-sidebar-item" data-fly="fly-backdrop_stand">
              <a href="backdrop-stand.html" class="ip-sidebar-link">
                <i class="fa-solid fa-image"></i>
                <span>Backdrops &amp; Exhibition</span>
                <i class="fa-solid fa-chevron-right ip-sidebar-arrow"></i>
              </a>
            </li>
            <li class="ip-sidebar-item" data-fly="fly-promotional_corporate_gifts">
              <a href="promotional-corporate-gifts.html" class="ip-sidebar-link">
                <i class="fa-solid fa-gift"></i>
                <span>Corporate Gifts &amp; Bags</span>
                <i class="fa-solid fa-chevron-right ip-sidebar-arrow"></i>
              </a>
            </li>
        </ul>
      </nav>

    </aside>

    <!-- Flyout sub-menu panels (appear to the right of sidebar on hover) -->
    <div id="ip-flyouts">

        <div class="ip-flyout" id="fly-digital_printing_services" role="navigation" aria-label="Print & Marketing submenu">
          <div class="ip-flyout-inner">
            <a href="digital-printing-services.html" class="ip-flyout-title">Print & Marketing</a>
            <div class="ip-fly-cols">
              <div class="ip-fly-col"><p class="ip-fly-heading">Stationery & Corporate Identity</p>
<a href="digital-business-cards.html" class="ip-fly-link">Business Cards</a>
<a href="letter-heads-printing.html" class="ip-fly-link">Letterheads</a>
<a href="envelopes-printing.html" class="ip-fly-link">Envelopes</a>
<a href="folders-printing.html" class="ip-fly-link">Folders</a>
<a href="notepads-printing.html" class="ip-fly-link">Notepads</a>
<a href="customized-notebooks.html" class="ip-fly-link">Notebook & Journal</a>
<a href="binding.html" class="ip-fly-link">Binding</a>
<a href="thank-you-cards-printing.html" class="ip-fly-link">Thank You Cards</a>
<a href="certificates-printing.html" class="ip-fly-link">Certificates</a>
<a href="calendars-printing.html" class="ip-fly-link">Calendars</a>
<a href="hang_tags_printing.html" class="ip-fly-link">Hang Tags</a>
<p class="ip-fly-heading">Brochures & Flyers</p>
<a href="brochures-printing.html" class="ip-fly-link">Brochures</a>
</div><div class="ip-fly-col"><a href="flyers-printing.html" class="ip-fly-link">Flyers</a>
<a href="catalogues-printing.html" class="ip-fly-link">Booklets & Catalogues</a>
<p class="ip-fly-heading">Seals</p>
<a href="stamps.html" class="ip-fly-link">Self Ink Stamps</a>
<a href="wax-seal.html" class="ip-fly-link">Wax Seal</a>
<a href="embossing-seal.html" class="ip-fly-link">Embossing Seal</a>
<p class="ip-fly-heading">Voucher Books</p>
<a href="invoice-books.html" class="ip-fly-link">Invoice Books</a>
<a href="receipt-voucher.html" class="ip-fly-link">Receipt Vouchers</a>
<p class="ip-fly-heading">Stickers</p>
<a href="stickers-prices.html" class="ip-fly-link">Die Cut Stickers</a>
<a href="print-and-cut-stickers.html" class="ip-fly-link">Print & Cut Stickers</a>
<a href="paper-stickers.html" class="ip-fly-link">Paper Sticker Gloss / Matt</a>
<a href="transparent-stickers.html" class="ip-fly-link">Transparent Stickers</a>
<a href="pvc-stickers.html" class="ip-fly-link">PVC Stickers White</a>
</div><div class="ip-fly-col"><a href="white-ink-stickers.html" class="ip-fly-link">White Ink Stickers</a>
<a href="epoxy-stickers.html" class="ip-fly-link">Epoxy Stickers</a>
<a href="windshield-stickers.html" class="ip-fly-link">Windshield Stickers</a>
<a href="stencil-stickers.html" class="ip-fly-link">Stencil Stickers</a>
<a href="foil-stickers.html" class="ip-fly-link">Foil Stickers</a>
<a href="metal-stickers.html" class="ip-fly-link">Metal Stickers</a>
<a href="embossing-seal.html#seal-stickers" class="ip-fly-link">Embossing Seal Stickers</a>
<a href="helmet-stickers.html" class="ip-fly-link">Helmet Stickers</a>
<a href="hologram-stickers-printing.html" class="ip-fly-link">Hologram Stickers</a>
<a href="kraft-paper-stickers.html" class="ip-fly-link">Kraft Paper Stickers</a>
<a href="boat-yacht-sticker.html" class="ip-fly-link">Boat / Yachts Stickers</a>
<a href="boat-yacht-sticker.html" class="ip-fly-link">Boat / Yachts Stickers</a>
</div><div class="ip-fly-col"><p class="ip-fly-heading">Crowd Promotion</p>
<a href="compliment-slips.html" class="ip-fly-link">Compliment Slips</a>
<a href="coupons-printing.html" class="ip-fly-link">Tickets & Coupons</a>
<a href="scratch-win-cards.html" class="ip-fly-link">Scratch & Win Coupons</a>
<a href="tent-cards.html" class="ip-fly-link">Tent Cards</a>
<a href="car-mat.html" class="ip-fly-link">Car Mat</a>
<a href="table-mat.html" class="ip-fly-link">Table Mat</a>
<p class="ip-fly-heading">CD / DVD</p>
<a href="cd-printing.html" class="ip-fly-link">CD / DVD Printing</a>
<a href="cd-covers-printing.html" class="ip-fly-link">CD / DVD Covers</a>
</div>
            </div>
          </div>
        </div>
        <div class="ip-flyout" id="fly-fabric_and_fashion_printing" role="navigation" aria-label="Fashion & Textile submenu">
          <div class="ip-flyout-inner">
            <a href="fabric-and-fashion-printing.html" class="ip-flyout-title">Fashion & Textile</a>
            <div class="ip-fly-cols">
              <div class="ip-fly-col"><p class="ip-fly-heading">Fashion</p>
<a href="scarf-fashion.html" class="ip-fly-link">Scarf</a>
<a href="sheila-fashion.html" class="ip-fly-link">Sheila</a>
<a href="bandana-fashion.html" class="ip-fly-link">Bandana</a>
<a href="hair-scarf-printing.html" class="ip-fly-link">Hair Scarf</a>
<a href="bag-scarf-fashion.html" class="ip-fly-link">Bag Scarf</a>
<a href="abaya-fashion.html" class="ip-fly-link">Abaya</a>
<a href="sarong-fashion.html" class="ip-fly-link">Sarong</a>
<a href="beach-shorts-fashion.html" class="ip-fly-link">Beach Shorts</a>
<a href="pocket-handkerchief-fashion.html" class="ip-fly-link">Pocket Handkerchief</a>
<a href="woven-labels.html" class="ip-fly-link">Woven Fabric Labels</a>
<a href="scrunchies-fashion.html" class="ip-fly-link">Scrunchie</a>
<p class="ip-fly-heading">Soft Furnishing</p>
<a href="curtains.html" class="ip-fly-link">Curtains</a>
</div><div class="ip-fly-col"><a href="blanket-soft-furnish.html" class="ip-fly-link">Blanket</a>
<a href="soft-furnish-pillow-cushion-printing.html" class="ip-fly-link">Decorative Pillows</a>
<a href="soft-furnish-pillow-cushion-printing.html#floor_cushion" class="ip-fly-link">Tiny Cushion</a>
<a href="soft-furnish-pillow-cushion-printing.html#floor_cushion" class="ip-fly-link">Floor Cushion</a>
<a href="soft-furnish-pillow-cushion-printing.html#bolster_pillow" class="ip-fly-link">Bolster Pillow</a>
<a href="soft-furnish-bean-bag.html" class="ip-fly-link">Bean Bags</a>
<a href="fabric-wrap.html" class="ip-fly-link">Fabric Wrap</a>
<p class="ip-fly-heading">Pouches</p>
<a href="draw-string-pouches.html#velvet_pouches" class="ip-fly-link">Velvet Pouches</a>
<a href="draw-string-pouches.html#tote_pouches" class="ip-fly-link">Tote Pouches</a>
<a href="draw-string-pouches.html#silk" class="ip-fly-link">Silk Sensation Pouches</a>
<a href="draw-string-pouches.html#zipper_pouches" class="ip-fly-link">Zipper Pouches</a>
<p class="ip-fly-heading">Lifestyle</p>
<a href="armband-printing.html" class="ip-fly-link">Armband</a>
</div><div class="ip-fly-col"><a href="sash-fashion.html" class="ip-fly-link">Sash</a>
<a href="hand-umbrella-printing.html" class="ip-fly-link">Hand Umbrella</a>
<a href="beach-towels.html" class="ip-fly-link">Beach Towel</a>
<a href="dining-apron.html" class="ip-fly-link">Apron</a>
<a href="beach-chair.html" class="ip-fly-link">Beach Chairs</a>
<a href="custom-face-mask.html#smartfit" class="ip-fly-link">Face Masks</a>
<a href="beach-towels.html" class="ip-fly-link">Beach Towel</a>
<p class="ip-fly-heading">Dining</p>
<a href="dining-table-placemat.html" class="ip-fly-link">Placemat</a>
<a href="table-napkin.html" class="ip-fly-link">Table Napkin</a>
<a href="dining-table-cloth.html" class="ip-fly-link">Dinning Table Cloth</a>
<p class="ip-fly-heading">Fabric Range</p>
<a href="all-fabrics-printing.html" class="ip-fly-link">Haute Couture</a>
<a href="all-fabrics-printing.html#fashion" class="ip-fly-link">Fashion Wear</a>
</div><div class="ip-fly-col"><a href="all-fabrics-printing.html#decor" class="ip-fly-link">Monroe Satin</a>
<p class="ip-fly-heading">Patterns</p>
<a href="floral-pattern-templates-1.html" class="ip-fly-link">Floral</a>
<a href="geometric-pattern-templates-1.html" class="ip-fly-link">Geometric</a>
<a href="landscape-templates-1.html" class="ip-fly-link">Landscape</a>
</div>
            </div>
          </div>
        </div>
        <div class="ip-flyout" id="fly-office_store_branding_printing" role="navigation" aria-label="Office & Store Branding submenu">
          <div class="ip-flyout-inner">
            <a href="office-store-branding-printing.html" class="ip-flyout-title">Office & Store Branding</a>
            <div class="ip-fly-cols">
              <div class="ip-fly-col"><p class="ip-fly-heading">Frosted Sticker</p>
<a href="frosted-glass-sticker.html#reverse_cut" class="ip-fly-link">Reverse Cut Frosted Sticker</a>
<a href="frosted-glass-sticker.html#standard_cut" class="ip-fly-link">Standard Cut Frosted Sticker</a>
<a href="frosted-glass-sticker.html#printed" class="ip-fly-link">Printed Frosted Sticker</a>
<a href="frosted-glass-sticker.html#blank" class="ip-fly-link">Blank Frosted Sticker</a>
<p class="ip-fly-heading">Window Branding</p>
<a href="window-vinyl-lettering.html" class="ip-fly-link">Window Vinyl Lettering</a>
<a href="window-graphics.html" class="ip-fly-link">Window Graphics</a>
<a href="one-way-vision-sticker.html" class="ip-fly-link">One Way Vision Sticker</a>
<a href="decorative-window-film.html" class="ip-fly-link">Window Films</a>
<p class="ip-fly-heading">Wall Branding</p>
<a href="wall-vinyl-lettering.html" class="ip-fly-link">Wall Vinyl Lettering</a>
<a href="wall-graphics.html" class="ip-fly-link">Wall Sticker</a>
<a href="wall-graphics.html#wall_decal" class="ip-fly-link">Wall Decal</a>
<p class="ip-fly-heading">Wall Décor</p>
<a href="wallpaper-printing.html#bedroom" class="ip-fly-link">Bedroom Wallpaper</a>
</div><div class="ip-fly-col"><a href="wallpaper-printing.html#livingroom" class="ip-fly-link">Living Room Wallpaper</a>
<p class="ip-fly-heading">Wall Frames</p>
<a href="canvas-printing.html" class="ip-fly-link">Canvas Frames</a>
<a href="wooden-frames-printing.html" class="ip-fly-link">Wooden Frames</a>
<a href="acrylic-frames-printing.html" class="ip-fly-link">Acrylic Frames</a>
<a href="metal-frames-printing.html" class="ip-fly-link">Metal Art</a>
<p class="ip-fly-heading">POS Display Stands</p>
<a href="pos-display-stand.html#floor_display" class="ip-fly-link">Floor Display Gondola</a>
<a href="pos-display-stand.html#3d_shelf" class="ip-fly-link">3D Display Stand</a>
<a href="pos-display-stand.html#counter_display" class="ip-fly-link">Counter Top Stand</a>
<a href="pos-display-stand.html#pedestal_stand" class="ip-fly-link">Pedestal Stand</a>
<p class="ip-fly-heading">Posters</p>
<a href="posters-printing.html#large" class="ip-fly-link">Large Posters</a>
<a href="posters-printing.html#mounted" class="ip-fly-link">Wall Mounted Posters</a>
<a href="posters-printing.html#hanger" class="ip-fly-link">Hanging Posters</a>
</div><div class="ip-fly-col"><p class="ip-fly-heading">Magnetic Sheet</p>
<a href="magnetic-sheet-printing.html#car" class="ip-fly-link">Car Magnets</a>
<a href="magnetic-sheet-printing.html#fridge" class="ip-fly-link">Fridge Magnets</a>
<a href="magnetic-sheet-printing.html#wall" class="ip-fly-link">Magnetic Wall</a>
<a href="magnetic-sheet-printing.html#domed" class="ip-fly-link">Domed Magnet</a>
<p class="ip-fly-heading">Vehicle Graphics</p>
<a href="vehicle-branding.html" class="ip-fly-link">Car Branding</a>
<a href="boat-yacht-sticker.html" class="ip-fly-link">Boat/ Yacht Branding</a>
<p class="ip-fly-heading">Repositionable Cling</p>
<a href="repositionable-cling.html#clear_static_clin" class="ip-fly-link">Clear Static Cling</a>
<a href="repositionable-cling.html#white_static_cling" class="ip-fly-link">Shape Cut Out Cling</a>
<p class="ip-fly-heading">Floor Sticker</p>
<a href="floor-graphic-sticker.html" class="ip-fly-link">Floor Direction Sticker</a>
<a href="floor-graphic-sticker.html" class="ip-fly-link">Footprint Floor Sticker</a>
<p class="ip-fly-heading">Workplace</p>
<a href="ceremonial_ribbons.html" class="ip-fly-link">Ceremonial Ribbon</a>
<a href="social-distancing-screen-divider.html" class="ip-fly-link">Counter Partition</a>
</div><div class="ip-fly-col"><a href="posters-printing.html#hanger" class="ip-fly-link">Poster Hanger</a>
<p class="ip-fly-heading">Repositionable Cling</p>
<a href="repositionable-cling.html#white_static_cling" class="ip-fly-link">White Static Cling</a>
</div>
            </div>
          </div>
        </div>
        <div class="ip-flyout" id="fly-signage_company_in" role="navigation" aria-label="Signages submenu">
          <div class="ip-flyout-inner">
            <a href="signage-company-in.html" class="ip-flyout-title">Signages</a>
            <div class="ip-fly-cols">
              <div class="ip-fly-col"><p class="ip-fly-heading">Sign Board / Signage</p>
<a href="unlit-3d-signage.html" class="ip-fly-link">3D Signage (Unlit)</a>
<a href="backlit-3d-signage.html" class="ip-fly-link">Backlit Signage</a>
<a href="outlit-3d-signage.html" class="ip-fly-link">Outlit 3D Signage</a>
<a href="flex-face-sign-board.html" class="ip-fly-link">Flex Face Signage</a>
<a href="frontlit-3d-sign-board.html" class="ip-fly-link">Frontlit Signage</a>
<a href="push-through-sign-board.html" class="ip-fly-link">Push Through Signage</a>
<a href="neon-sign-board.html" class="ip-fly-link">Neon Signage</a>
<p class="ip-fly-heading">Name Plate</p>
<a href="metal-name-plates.html" class="ip-fly-link">Metal Name Plates</a>
<a href="acrylic-name-plates.html" class="ip-fly-link">Acrylic Name Plates</a>
<a href="wooden-name-plates.html" class="ip-fly-link">Wooden Name Plates</a>
<a href="table-top-plates.html" class="ip-fly-link">Table Top Signage</a>
<p class="ip-fly-heading">Light Box Signages</p>
<a href="flex-face-light-box.html" class="ip-fly-link">Flex Face Signs (Light Box)</a>
</div><div class="ip-fly-col"><a href="fabric-light-box.html" class="ip-fly-link">Fabric Light Box</a>
<a href="acrylic-light-box.html" class="ip-fly-link">Acrylic Signage Board</a>
<a href="poster-light-box.html" class="ip-fly-link">Poster Light Box</a>
<p class="ip-fly-heading">Self Standing Letters</p>
<a href="metal-letters.html" class="ip-fly-link">Metal Letters</a>
<a href="wooden-letters.html" class="ip-fly-link">Wooden Letters</a>
<a href="acrylic-letters.html" class="ip-fly-link">Acrylic Letters</a>
<a href="forex-foam-letters.html" class="ip-fly-link">Forex / Foam Letters</a>
<p class="ip-fly-heading">Direction / Wayfinding Signage</p>
<a href="self-standing-sign.html" class="ip-fly-link">Self-Standing Signage</a>
<a href="wall-mounted-signage.html" class="ip-fly-link">Wall Mounted Signage</a>
<a href="hanging-signage.html" class="ip-fly-link">Hanging Signage</a>
<a href="wayfinding-signs.html" class="ip-fly-link">Self Standing Signage</a>
<a href="directory-signage.html" class="ip-fly-link">Directory Signage</a>
</div><div class="ip-fly-col"><p class="ip-fly-heading">Labels</p>
<a href="traffolyte-labels.html" class="ip-fly-link">Traffolyte / PVC / Acrylic Labels</a>
<a href="metal-labels.html" class="ip-fly-link">Metal Labels</a>
<a href="wooden-labels.html" class="ip-fly-link">Wooden Labels</a>
<a href="acrylic-labels.html" class="ip-fly-link">Acrylic Labels</a>
<p class="ip-fly-heading">Safety Signage</p>
<a href="self-standing-sign.html" class="ip-fly-link">Self-Standing Sign</a>
<a href="wall-mounted-signage.html" class="ip-fly-link">Wall Mounted Sign</a>
<a href="floor-signs-graphics.html" class="ip-fly-link">Floor Sign / Signage</a>
</div>
            </div>
          </div>
        </div>
        <div class="ip-flyout" id="fly-flags_printing_branding" role="navigation" aria-label="Flags submenu">
          <div class="ip-flyout-inner">
            <a href="flags-printing-branding.html" class="ip-flyout-title">Flags</a>
            <div class="ip-fly-cols">
              <div class="ip-fly-col"><p class="ip-fly-heading">Event & Branding Flags</p>
<a href="sail_flags.html" class="ip-fly-link">Sail Flags</a>
<a href="tear_drop_flags.html" class="ip-fly-link">Tear Drop Flags</a>
<a href="l_shape_flags.html" class="ip-fly-link">L Shape Flags</a>
<a href="blade_flags.html" class="ip-fly-link">Blade Flags</a>
<a href="telescopic_flags.html" class="ip-fly-link">Telescopic Flags</a>
<a href="advertising_flags.html" class="ip-fly-link">Advertising Flags</a>
<p class="ip-fly-heading">Flag Base</p>
<a href="flag-base.html" class="ip-fly-link">Concrete Base</a>
<a href="flag-base.html#cross_base" class="ip-fly-link">Cross Base</a>
<a href="flag-base.html#water_base" class="ip-fly-link">Water Base</a>
<a href="flag-base.html#spike_base" class="ip-fly-link">Spike Base</a>
<p class="ip-fly-heading">Office Flags</p>
<a href="table_flags.html" class="ip-fly-link">Table Flags</a>
<a href="table_flags.html#flag_royal" class="ip-fly-link">Table Flags - Royal</a>
</div><div class="ip-fly-col"><a href="conference_flags.html" class="ip-fly-link">Conference Flags</a>
<a href="conference_hanging_flags.html" class="ip-fly-link">Conference Flags - Hanging</a>
<p class="ip-fly-heading">Outdoor Flags</p>
<a href="hoisting_flags.html" class="ip-fly-link">Hoisting Flags</a>
<a href="wall_mounted_flags.html" class="ip-fly-link">Wall Mounted Flags</a>
<a href="stadium-flags.html" class="ip-fly-link">Stadium Flags</a>
<a href="advertising_flags.html" class="ip-fly-link">Advertising Flags</a>
<a href="festival_flags.html" class="ip-fly-link">Festival Flags</a>
<p class="ip-fly-heading">Event Gear</p>
<a href="hand_waving_flags.html" class="ip-fly-link">Pole Flags</a>
<a href="hand_held_flags.html" class="ip-fly-link">Hand Flags</a>
<a href="finish-line.html" class="ip-fly-link">Finish Line</a>
<a href="body_flags.html" class="ip-fly-link">Body Flags</a>
<a href="soccer_sport_scarf.html" class="ip-fly-link">Fan Scarf</a>
</div><div class="ip-fly-col"><p class="ip-fly-heading">Decorative Flags</p>
<a href="car_flags.html" class="ip-fly-link">Car Flags</a>
<a href="car_desert_flags.html" class="ip-fly-link">Car Desert Flags</a>
<a href="dashboard_flags.html" class="ip-fly-link">Dashboard Flags</a>
<a href="pennant_flags.html" class="ip-fly-link">Pennant Flags</a>
<a href="bunting_flags.html" class="ip-fly-link">Bunting Flags</a>
<a href="toothpick_flags.html" class="ip-fly-link">Toothpick Flags</a>
</div>
            </div>
          </div>
        </div>
        <div class="ip-flyout" id="fly-backdrop_stand" role="navigation" aria-label="Backdrops & Exhibition submenu">
          <div class="ip-flyout-inner">
            <a href="backdrop-stand.html" class="ip-flyout-title">Backdrops & Exhibition</a>
            <div class="ip-fly-cols">
              <div class="ip-fly-col"><p class="ip-fly-heading">Standees</p>
<a href="roll-ups-printing.html#rollup01" class="ip-fly-link">Rollup Banners</a>
<a href="banners-printing.html#xbanner" class="ip-fly-link">X Banners</a>
<a href="snapfold-backlit-standee-printing.html" class="ip-fly-link">Backlit Snapfold Standee</a>
<a href="backlit-standee.html" class="ip-fly-link">Classic Backlit Standee</a>
<a href="lama-standee-printing.html#totem_standee" class="ip-fly-link">Totem Display Stand</a>
<a href="banners-printing.html" class="ip-fly-link">Banners - PVC & Fabric</a>
<a href="fence-banner-printing.html" class="ip-fly-link">Fence Banners</a>
<a href="lama-standee-printing.html" class="ip-fly-link">Lama Stand</a>
<a href="pop-out-banner-printing-in.html" class="ip-fly-link">Popout Banner / Spring A Board</a>
<a href="toblerone-a-frame-printing-in.html" class="ip-fly-link">Toblerone Frame</a>
<a href="cutout-standee-printing.html" class="ip-fly-link">Cutout Standee</a>
<p class="ip-fly-heading">Backdrops</p>
<a href="pop-up-banner.html#curved" class="ip-fly-link">Pop Ups</a>
</div><div class="ip-fly-col"><a href="fabric-pop-up-printing-in.html" class="ip-fly-link">Fabric Pop Ups</a>
<a href="fabric-backdrop-printing-in.html#fabricstandee" class="ip-fly-link">Fabric Backdrop - Indoor</a>
<a href="fabric-backdrop-printing-in.html#fabric-backdrop-outdoor" class="ip-fly-link">Fabric Backdrop - Outdoor</a>
<a href="wooden-backdrop-printing-in.html" class="ip-fly-link">Wooden Backdrop</a>
<a href="step-and-repeat-backdrop-printing-in.html" class="ip-fly-link">Step & Repeat Backdrop</a>
<a href="fabric-backdrop-printing-in.html#fabric-backdrop-curved" class="ip-fly-link">Curved Backdrop</a>
<a href="backlit-backdrop-printing-in.html" class="ip-fly-link">Backlit Backdrop</a>
<a href="led-screen-rental.html" class="ip-fly-link">LED Screen</a>
<a href="balloon-decorators.html" class="ip-fly-link">Balloon  Decorators</a>
<a href="photo-booth.html" class="ip-fly-link">Magazine Photo Booth</a>
<p class="ip-fly-heading">Foam Board</p>
<a href="foam-board.html#foam" class="ip-fly-link">Wall Mounted</a>
<a href="foam-board.html#foam" class="ip-fly-link">Giant Cheques</a>
</div><div class="ip-fly-col"><p class="ip-fly-heading">Exhibition & Events</p>
<a href="promotion-table.html" class="ip-fly-link">Promotion Table</a>
<a href="exhibition-counter.html" class="ip-fly-link">Exhibition Counters</a>
<a href="outdoor-tent-printing.html" class="ip-fly-link">Tent / Gazebo</a>
<a href="outdoor-umbrella.html" class="ip-fly-link">Outdoor Umbrella</a>
<a href="table-cloth-table-cover.html" class="ip-fly-link">Table Cover & Table Cloth</a>
<p class="ip-fly-heading">Shell Scheme Booths</p>
<a href="exhibition-graphics.html" class="ip-fly-link">Panel / Seamless Branding</a>
<a href="backlit-modular-shell-scheme.html" class="ip-fly-link">Island Backlit Shell Scheme</a>
<a href="backlit-modular-shell-scheme.html#modular" class="ip-fly-link">Modular Backlit Booths</a>
<p class="ip-fly-heading">Event Props</p>
<a href="party-props.html" class="ip-fly-link">Marquee Board</a>
<a href="social_media_hashtag_frame.html" class="ip-fly-link">Social Media Frame</a>
<a href="social_media_hashtag_frame.html#hashtag" class="ip-fly-link">Hashtag</a>
<a href="social_media_hashtag_frame.html#giant_cheque" class="ip-fly-link">Giant Cheques</a>
</div><div class="ip-fly-col"><a href="party-props.html" class="ip-fly-link">Party Props</a>
<p class="ip-fly-heading">Party Essentials</p>
<a href="party-props.html#face_mask" class="ip-fly-link">Face Masks</a>
<a href="party-props.html#hats" class="ip-fly-link">Party Hats</a>
</div>
            </div>
          </div>
        </div>
        <div class="ip-flyout" id="fly-promotional_corporate_gifts" role="navigation" aria-label="Corporate Gifts & Bags submenu">
          <div class="ip-flyout-inner">
            <a href="promotional-corporate-gifts.html" class="ip-flyout-title">Corporate Gifts & Bags</a>
            <div class="ip-fly-cols">
              <div class="ip-fly-col"><p class="ip-fly-heading">Office Essentials</p>
<a href="pens-printing.html" class="ip-fly-link">Pens</a>
<a href="notebooks-printing.html" class="ip-fly-link">PU Notebooks</a>
<a href="pu-organizer.html" class="ip-fly-link">PU Organizer</a>
<a href="gift-sets.html" class="ip-fly-link">Corporate Gift Sets</a>
<a href="mouse-pad-printing.html" class="ip-fly-link">Mouse Pad</a>
<p class="ip-fly-heading">Drinkware</p>
<a href="mugs-printing.html" class="ip-fly-link">Mugs</a>
<a href="bottles-printing.html" class="ip-fly-link">Bottles</a>
<a href="tumblers-printing.html" class="ip-fly-link">Tumblers</a>
<a href="drink-coasters-printing.html" class="ip-fly-link">Coaster</a>
<a href="coffee-stencil.html" class="ip-fly-link">Coffee Stencil</a>
<p class="ip-fly-heading">Apparel</p>
<a href="t-shirts-printing.html" class="ip-fly-link">T-Shirt</a>
<a href="jersey-printing.html" class="ip-fly-link">Jersey</a>
</div><div class="ip-fly-col"><a href="caps-printing.html" class="ip-fly-link">Caps</a>
<a href="safety-vest-jacket-printing.html" class="ip-fly-link">Safety Vest</a>
<a href="embroidered-patches.html" class="ip-fly-link">Embroidery Patches</a>
<a href="embroidered-patches.html#silicone_patches" class="ip-fly-link">Silicone Labels</a>
<p class="ip-fly-heading">Event Disposables</p>
<a href="napkins.html" class="ip-fly-link">Napkin</a>
<a href="paper-cup.html" class="ip-fly-link">Paper Cup</a>
<a href="water-bottle-label.html" class="ip-fly-link">Water Bottle Label</a>
<p class="ip-fly-heading">Trade Shows & Events</p>
<a href="wristband-printing.html" class="ip-fly-link">Wristband</a>
<a href="lanyard-printing.html" class="ip-fly-link">Lanyards</a>
<a href="id-cards.html" class="ip-fly-link">ID Cards & Badge Reel</a>
<a href="name-badges.html" class="ip-fly-link">Name Badges</a>
<a href="trophies-and-plaques.html" class="ip-fly-link">Crystal Trophies</a>
</div><div class="ip-fly-col"><a href="medals.html" class="ip-fly-link">Medals</a>
<a href="keychain-printing.html" class="ip-fly-link">Keychain</a>
<a href="magnetic-sheet-printing.html#silicone-magnet" class="ip-fly-link">Silicone Fridge Magnet</a>
<p class="ip-fly-heading">Tech Products</p>
<a href="usb-printing.html" class="ip-fly-link">USB</a>
<a href="custom-power-banks.html" class="ip-fly-link">Power Banks</a>
<a href="custom-bluetooth-speakers.html" class="ip-fly-link">Bluetooth Speakers</a>
<a href="custom-charging-cables.html" class="ip-fly-link">Charging Cables</a>
<p class="ip-fly-heading">Shopping/Promotional Bags</p>
<a href="paper-bags-printing.html" class="ip-fly-link">Paper Bag</a>
<a href="kraft-bags-printing.html" class="ip-fly-link">Kraft Bag</a>
<a href="non-woven-bags-printing.html" class="ip-fly-link">Non Woven Bag</a>
<a href="jute-bags-printing.html" class="ip-fly-link">Jute Bag</a>
<a href="tote-bags-printing.html" class="ip-fly-link">Tote Bag</a>
</div><div class="ip-fly-col"><a href="tote-bags-printing.html#canvas" class="ip-fly-link">Canvas Bag</a>
<a href="string-bags-printing.html" class="ip-fly-link">Drawstring Bag</a>
<a href="string-bags-printing.html#cottonbags" class="ip-fly-link">Cotton String Bag</a>
<p class="ip-fly-heading">Executive Kit</p>
<a href="custom-lapel-pins.html" class="ip-fly-link">Lapel Pins</a>
<a href="tie-printing.html" class="ip-fly-link">Tie & Tie Clip</a>
<a href="cufflinks.html" class="ip-fly-link">Cufflink</a>
<a href="challenge-coins.html" class="ip-fly-link">Challenge Coins</a>
<a href="pocket-handkerchief-fashion.html" class="ip-fly-link">Pocket Square</a>
</div>
            </div>
          </div>
        </div>
    </div>

    <!-- Mobile overlay -->
    <div class="ip-overlay" id="ip-overlay"></div>

    <!-- ================================================================
         STICKY TOP HEADER  —  8 core page links only (no categories)
    ================================================================ -->
    <div class="nav-contact desktop-view">
      <a href="index.html" aria-label="Ideal Printers">
        <img src="images/ideal-printers-logo-horizontal.png" class="logo" alt="Ideal Printers Lahore">
      </a>
      <div class="search__section">
        <div class="searchBar">
          <div style="display:flex;align-items:center;">
            <input autocomplete="off" id="desktop-searchbar-focus"
              class="search__input form-control mr-sm-2"
              style="width:400px;border-radius:25px;"
              type="text" placeholder="Search..." name="search"
              onkeydown="if(event.key==='Enter'){event.preventDefault();desktopSearch();}">
            <button onclick="desktopSearch()"
              class="btn my-2 my-sm-0 btn-template-main"
              style="margin-left:-50px;" type="submit">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div class="search__results" style="display:none;"></div>
        </div>
      </div>
    </div>

    <div id="navbar" class="navbar-container">
      <nav class="navbar navbar-expand-lg ip-topnav-bar">
        <div class="container-fluid">

          <!-- Mobile hamburger (opens sidebar drawer) -->
          <button class="navbar-toggler ip-hamburger" id="ip-hamburger"
            type="button" aria-label="Toggle menu" aria-expanded="false">
            <div class="hamburger" id="hamburger-1" aria-hidden="true">
              <span class="line"></span>
              <span class="line"></span>
              <span class="line"></span>
            </div>
          </button>

          <!-- Mobile logo -->
          <a class="mobile-view ip-mobile-logo" href="index.html" aria-label="Ideal Printers">
            <img src="images/ideal-printers-logo-horizontal.png"
              class="logo" alt="Ideal Printers Lahore">
          </a>
          


          <!-- Mobile search bar (always visible, same as desktop) -->
          <div style="width:100%;padding:5px 10px;"
            id="mobile-searchbar"
            class="search__section mobile-view ip-mobile-search">
            <div class="searchBar1">
              <div style="display:flex;width:95%;align-items:center;margin:auto;">
                <input autocomplete="off" id="mobile-searchbar-focus"
                  class="search__input form-control mr-sm-2"
                  style="width:100%;border-radius:25px;"
                  type="text" placeholder="Search..." name="search1"
                  onkeydown="if(event.key==='Enter'){event.preventDefault();mobileSearch();}">
                <button type="button" onclick="mobileSearch()"
                  class="btn my-2 my-sm-0 btn-template-main"
                  style="margin-left:-50px;" aria-label="Search">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <div class="search__results1" style="display:none;width:82%;margin-left:5%;"></div>
            </div>
          </div>

          <!-- Desktop nav links (8 core pages only) -->
          <div class="navbar-collapse collapse" id="main_nav">
            <ul class="navbar-nav ip-header-links">

              <li class="nav-item">
                <a href="index.html" class="nav-link ip-hlink">
                  <i class="fa-solid fa-house" style="margin-right:4px;"></i>Home
                </a>
              </li>
              <li class="nav-item">
                <a href="about-company.html" class="nav-link ip-hlink">About Us</a>
              </li>
              <li class="nav-item">
                <a href="portfolio.html" class="nav-link ip-hlink">Our Projects</a>
              </li>
              <li class="nav-item">
                <a href="digital-printing-services.html" class="nav-link ip-hlink">Printing Services</a>
              </li>
              <li class="nav-item">
                <a href="faq.html" class="nav-link ip-hlink">FAQs</a>
              </li>
              <li class="nav-item">
                <a href="terms.html" class="nav-link ip-hlink">Terms</a>
              </li>
              <li class="nav-item">
                <a href="privacy_policy.html" class="nav-link ip-hlink">Privacy</a>
              </li>
              <li class="nav-item">
                <a href="contact-us.html" class="nav-link ip-hlink">Contact Us</a>
              </li>

            </ul>
          </div>

        </div>
      </nav>
    </div>
  `;

  setTimeout(function(){
    ipWireLayout();
    ipEnsureFooterPlacement();
    initSiteFooter();
    consolidateInquiryModal();
    bindInquiryModalFix();
    wireInquiryButtons();
    ipWireSidebar();
    ipWireFlyouts();
    ipMarkActive();
    initBottomContactBar();
    wireInquiryButtons();
    attachNavbarDropdownBehavior();
    updateMobileHeaderScrollState();
    syncMobileHeaderOffset();
    setTimeout(syncMobileHeaderOffset, 100);
    setTimeout(syncMobileHeaderOffset, 500);
  }, 0);
}

function getSiteFooterHtml() {
  return `
  <footer class="main-footer">
  <div class="container">
    <div id="footer">
    <div class="row">
      <div class="col-lg-3">
        <h4 class="footer-heading">Ideal Printers</h4>
        <p>
                <i class="fa fa-location-arrow"></i> <strong>Sales Office / Factory</strong>
                <p>
                  G-2, Al-Rehman Centre, Shama Metro Station, 70-Ferozepur Road, Lahore
                </p>
        </p>
        <h4 class="footer-heading mt-3">Follow Us</h4>
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
        <h4 class="footer-heading">Contact Us</h4>
        <i class="fa fa-phone"></i> +92 42 3597 9285<br>
         <i class="fa fa-phone"></i> +92 30 0460 2749<br>
        <a href="mailto:idealprinter41@gmail.com"><i class="fa fa-envelope"></i>  idealprinter41@gmail.com</a> <br><br>
              <h4 class="footer-heading">Working Hours</h4>
                     <p>9:00 am to 2:00 pm
              <br>
              3:00 pm to 10:00 pm
              <br>
              2:00 pm to 3:00 pm (Lunch Break)
              <br>
              Monday to Sunday
              </p>
        <hr class="d-block d-lg-none">
      </div>
      <div class="col-lg-3">
        <h4 class="footer-heading">Quick Links</h4>
          <ul class="list-inline">
                  <li><a href="index.html"><i class="fa fa-caret-right"></i> Home </a></li>
                  <li><a href="portfolio.html"><i class="fa fa-caret-right"></i> Our Projects </a></li>
                  <li><a href="about-company.html"><i class="fa fa-caret-right"></i> About Us </a></li>
                  <li><a href="digital-printing-services.html"><i class="fa fa-caret-right"></i> Printing Services</a></li>
                  <li><a href="blog.html"><i class="fa fa-caret-right"></i> Blogs </a></li>
                  <li><a href="faq.html"><i class="fa fa-caret-right"></i> FAQs </a></li>
                  <li><a href="terms.html"><i class="fa fa-caret-right"></i> Terms </a></li>
                  <li><a href="career.html"><i class="fa fa-caret-right"></i> Careers </a></li>
                  <li><a href="privacy_policy.html"><i class="fa fa-caret-right"></i> Privacy </a></li>
                  <li><a href="contact-us.html"><i class="fa fa-caret-right"></i> Contact Us </a></li>
                </ul>
      </div>
      <div class="col-lg-3">
        <div class="img-fluid mb-3">
          <iframe style="border-radius: 10px; border:0;" src="https://www.google.com/maps?q=Ideal+Printers,+70-G-2,+Rehman+Center,+Road,+Ichhra,+Lahore,+Pakistan&output=embed" width="100%" height="200" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
                <div style="width: 120px"><img src="form/captcha.jpg" id="captcha_image" alt="Captcha"/></div>
                <span><a id="captcha_reload" href="#"><font size="2">Refresh</font></a></span>
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
      </div>
    </div>
  </div>
  </footer>
  <button onclick="topFunction()" id="back-to-top" title="Go to top" type="button">
    <i class="fa-solid fa-chevron-up"></i>
  </button>
  <a href="https://api.whatsapp.com/send?phone=923004602749&text=Hello!" target="_blank" id="fixed-whatsapp-icon">
  <i class="fa-brands fa-whatsapp"></i>
  </a>`;
}

function initSiteFooter() {
  var footerDiv = document.getElementById("footer-div");
  if (!footerDiv || footerDiv.querySelector(".main-footer")) {
    return;
  }
  footerDiv.innerHTML = getSiteFooterHtml();
}

function ipEnsureFooterPlacement() {
  var col = document.querySelector(".ip-page-col");
  var footerDiv = document.getElementById("footer-div");
  if (!footerDiv) {
    return;
  }

  if (col && footerDiv.parentElement !== col) {
    col.appendChild(footerDiv);
  }

  var oldSpacer = document.getElementById("ip-bottom-spacer");
  if (oldSpacer) {
    oldSpacer.parentNode.removeChild(oldSpacer);
  }
}

function getBottomContactBarHtml() {
  return `
  <div class="bottumContent">
    <div class="ip-bottom-contacts">
      <a href="tel:+924235979285" class="ip-bottom-phone">
        <i class="fa fa-phone" aria-hidden="true"></i><span>+92 42 3597 9285</span>
      </a>
      <a href="tel:+923004602749" class="ip-bottom-phone">
        <i class="fa fa-phone" aria-hidden="true"></i><span>+92 30 0460 2749</span>
      </a>
      <a href="mailto:idealprinter41@gmail.com" class="ip-bottom-email">
        <i class="fa fa-envelope" aria-hidden="true"></i><span>idealprinter41@gmail.com</span>
      </a>
    </div>
    <div class="ip-bottom-actions">
      <a href="#" class="btn btn-template-main inquiry-btn" data-ip-inquiry-open>Quick Inquiry</a>
      <div class="social-media-section ip-bottom-social" aria-label="Follow us">
        <h6 class="ip-bottom-social-label">Follow Us</h6>
        <div class="ip-bottom-social-icons">
          <a href="https://www.facebook.com/idealprinters41/" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa-brands fa-square-facebook facebook"></i></a>
          <a href="#" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-square-instagram instagram"></i></a>
          <a href="https://twitter.com/Muhamma51494191" target="_blank" rel="noopener" aria-label="Twitter"><i class="fa-brands fa-square-x-twitter twitter"></i></a>
          <a href="#" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fa-brands fa-linkedin linkedin"></i></a>
          <a href="#" target="_blank" rel="noopener" aria-label="YouTube"><i class="fa-brands fa-youtube youtube"></i></a>
          <a href="#" target="_blank" rel="noopener" aria-label="Pinterest"><i class="fa-brands fa-pinterest pinterest"></i></a>
        </div>
      </div>
    </div>
  </div>`;
}

function initBottomContactBar() {
  var bottomBar = document.getElementById("bottumDiv");
  if (!bottomBar) {
    return;
  }

  if (!bottomBar.querySelector(".ip-bottom-contacts")) {
    bottomBar.innerHTML = getBottomContactBarHtml();
  }

  if (bottomBar.parentNode !== document.body) {
    document.body.appendChild(bottomBar);
  }
  bottomBar.classList.add("show");
  syncBottomBarLayout();
  bindBottomBarLayoutSync();
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.body.style.transition = " all .45s";
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  document.documentElement.style.transition = " all .45s";
}

var MOBILE_HEADER_BREAKPOINT = 991;
var MOBILE_HEADER_SCROLL_THRESHOLD = 24;

function injectMobileHeaderFixStyles() {
  if (document.getElementById("ip-mobile-header-fix")) {
    return;
  }

  var style = document.createElement("style");
  style.id = "ip-mobile-header-fix";
  style.textContent = [
    "@media (max-width: 991px) {",
    "  body.ip-mobile-header-active {",
    "    padding-top: var(--ip-mobile-header-h, 96px) !important;",
    "  }",
    "  .contact-container {",
    "    position: fixed !important;",
    "    top: 0 !important;",
    "    left: 0 !important;",
    "    right: 0 !important;",
    "    width: 100% !important;",
    "    z-index: 1090 !important;",
    "    background-color: #fff;",
    "    box-shadow: none;",
    "    transition: box-shadow 0.2s ease;",
    "  }",
    "  .contact-container.ip-header--scrolled {",
    "    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);",
    "  }",
    "  .contact-container.ip-header--scrolled #mobile-searchbar,",
    "  .contact-container.ip-header--scrolled .ip-mobile-search {",
    "    display: none !important;",
    "    max-height: 0 !important;",
    "    padding: 0 !important;",
    "    margin: 0 !important;",
    "    overflow: hidden !important;",
    "  }",
    "  .contact-container.ip-header--scrolled .search__results1 {",
    "    display: none !important;",
    "  }",
    "  .contact-container:not(.ip-header--scrolled) .ip-mobile-search,",
    "  .contact-container:not(.ip-header--scrolled) #mobile-searchbar {",
    "    display: block !important;",
    "  }",
    "  .contact-container .ip-mobile-logo {",
    "    flex: 1 1 auto;",
    "    display: inline-flex !important;",
    "    justify-content: center;",
    "    align-items: center;",
    "    margin: 0 !important;",
    "    min-height: 44px;",
    "    width: auto;",
    "  }",
    "  .contact-container .ip-mobile-logo .logo {",
    "    width: 140px;",
    "    max-width: 52vw;",
    "    height: auto;",
    "    margin-left: 0 !important;",
    "    display: inline;",
    "  }",
    "  .navbar .container-fluid {",
    "    flex-wrap: wrap;",
    "    align-items: center;",
    "  }",
    "  .ip-hamburger {",
    "    flex: 0 0 auto;",
    "    z-index: 2;",
    "  }",
    "}"
  ].join("\n");
  document.head.appendChild(style);
}

function getPageScrollTop() {
  return window.pageYOffset
    || document.documentElement.scrollTop
    || document.body.scrollTop
    || 0;
}

function syncMobileHeaderOffset() {
  var header = document.querySelector(".contact-container");
  if (!header || window.innerWidth > MOBILE_HEADER_BREAKPOINT) {
    document.documentElement.style.removeProperty("--ip-mobile-header-h");
    document.body.classList.remove("ip-mobile-header-active");
    return;
  }

  var headerBar = header.querySelector("#navbar") || header;
  var height = Math.ceil(headerBar.getBoundingClientRect().height);
  if (!height) {
    height = header.classList.contains("ip-header--scrolled") ? 52 : 96;
  }

  document.documentElement.style.setProperty("--ip-mobile-header-h", height + "px");
  document.body.classList.add("ip-mobile-header-active");
}

function updateMobileHeaderScrollState() {
  var header = document.querySelector(".contact-container");
  if (!header) {
    return;
  }

  if (window.innerWidth > MOBILE_HEADER_BREAKPOINT) {
    header.classList.remove("ip-header--scrolled");
    syncMobileHeaderOffset();
    return;
  }

  if (getPageScrollTop() > MOBILE_HEADER_SCROLL_THRESHOLD) {
    header.classList.add("ip-header--scrolled");
    var mobileSearchResults = header.querySelector(".search__results1");
    if (mobileSearchResults) {
      mobileSearchResults.style.display = "none";
    }
  } else {
    header.classList.remove("ip-header--scrolled");
  }

  requestAnimationFrame(syncMobileHeaderOffset);
}

injectMobileHeaderFixStyles();

// Resolve dynamically because footer/buttons are injected after script load.
function scrollFunction() {
  updateMobileHeaderScrollState();

  var mybutton = document.getElementById("back-to-top");
  if (!mybutton) {
    return;
  }
  if (getPageScrollTop() > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

window.addEventListener("scroll", scrollFunction, { passive: true });
window.addEventListener("resize", function () {
  updateMobileHeaderScrollState();
  syncMobileHeaderOffset();
}, { passive: true });
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    scrollFunction();
    syncMobileHeaderOffset();
  });
} else {
  scrollFunction();
  syncMobileHeaderOffset();
}

window.addEventListener("load", syncMobileHeaderOffset, { passive: true });

function syncBottomBarLayout() {
  var bottomBar = document.getElementById("bottumDiv");
  if (!bottomBar) {
    return;
  }

  requestAnimationFrame(function () {
    var height = Math.ceil(bottomBar.getBoundingClientRect().height);
    if (!height || height < 1) {
      height = 64;
    }
    document.documentElement.style.setProperty("--ip-bottom-bar-h", height + "px");
  });
}

function bindBottomBarLayoutSync() {
  if (window.__ipBottomBarLayoutBound) {
    return;
  }
  window.__ipBottomBarLayoutBound = true;

  window.addEventListener("resize", syncBottomBarLayout);
  window.addEventListener("load", syncBottomBarLayout);

  var bottomBar = document.getElementById("bottumDiv");
  if (bottomBar && typeof ResizeObserver !== "undefined") {
    var observer = new ResizeObserver(syncBottomBarLayout);
    observer.observe(bottomBar);
  }

  var footerDiv = document.getElementById("footer-div");
  if (footerDiv && typeof MutationObserver !== "undefined") {
    var footerObserver = new MutationObserver(function () {
      syncBottomBarLayout();
    });
    footerObserver.observe(footerDiv, { childList: true, subtree: true });
  }

  setTimeout(syncBottomBarLayout, 100);
  setTimeout(syncBottomBarLayout, 600);
}

/* ---- Move page content into layout wrapper ---- */
function ipWireLayout() {
  var navDiv = document.getElementById("navbar-div");
  if (!navDiv || document.querySelector(".ip-body-wrap")) return;

  var bottomBar = document.getElementById("bottumDiv");
  var wrap = document.createElement("div");
  wrap.className = "ip-body-wrap";
  var col = document.createElement("div");
  col.className = "ip-page-col";

  var parent = navDiv.parentNode;
  var node = navDiv.nextSibling;
  while (node) {
    var next = node.nextSibling;
    if (node !== bottomBar) {
      col.appendChild(node);
    }
    node = next;
  }
  wrap.appendChild(col);
  parent.insertBefore(wrap, navDiv.nextSibling);

  if (bottomBar && bottomBar.parentNode !== document.body) {
    document.body.appendChild(bottomBar);
  }

  ipEnsureFooterPlacement();
}

/* ---- Mobile sidebar open/close ---- */
function ipWireSidebar() {
  var hamBtn  = document.getElementById("ip-hamburger");
  var sidebar = document.getElementById("ip-sidebar");
  var overlay = document.getElementById("ip-overlay");
  var hamClose = document.getElementById("hamburger-1");
  if (!sidebar) return;

  function open()  { sidebar.classList.add("ip-sidebar--open");    
    if(overlay) {
      overlay.classList.add("ip-overlay--on")
    }; 
  }
  function close() { sidebar.classList.remove("ip-sidebar--open"); if(overlay) {overlay.classList.remove("ip-overlay--on")}; ipCloseAllFlyouts(); }

  if (hamBtn) {
    hamBtn.addEventListener("click", function(e) {
      if (window.innerWidth <= 991) {
        e.stopPropagation();
        open();
        //sidebar.classList.contains("ip-sidebar--open") ? close() : open();
      }
    });
  }
  if (overlay) {overlay.addEventListener("click", close)};
  var closeBtn = document.getElementById("my-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      close();
      if (hamClose) {
        hamClose.classList.remove("is-active");
      }
    });
  }
}

/* ---- Sidebar flyout hover menus ---- */
function ipWireFlyouts() {
  var items = document.querySelectorAll(".ip-sidebar-item[data-fly]");
  var openTimer, closeTimer;
  var currentFly = null;

  function showFly(flyId, item) {
    ipCloseAllFlyouts();
    currentFly = flyId;
    var fly = document.getElementById(flyId);
    if (!fly) return;

    var sidebar = document.getElementById("ip-sidebar");
    var sRect = sidebar ? sidebar.getBoundingClientRect() : {right: 220};
    var iRect = item.getBoundingClientRect();

    fly.style.top  = Math.max(0, iRect.top) + "px";
    fly.style.left = sRect.right + "px";
    fly.classList.add("ip-flyout--visible");
  }

  function hideFly(flyId) {
    var fly = document.getElementById(flyId);
    if (fly) fly.classList.remove("ip-flyout--visible");
    if (currentFly === flyId) currentFly = null;
  }

  items.forEach(function(item) {
    var flyId = item.getAttribute("data-fly");

    item.addEventListener("mouseenter", function() {
      clearTimeout(closeTimer);
      openTimer = setTimeout(function() { showFly(flyId, item); }, 80);
    });

    item.addEventListener("mouseleave", function(e) {
      clearTimeout(openTimer);
      var fly = document.getElementById(flyId);
      if (!fly) return;
      // Check if moving to flyout
      var related = e.relatedTarget;
      if (fly.contains(related)) return;
      closeTimer = setTimeout(function() { hideFly(flyId); }, 150);
    });

    // Wire the flyout panel itself
    var fly = document.getElementById(flyId);
    if (fly) {
      fly.addEventListener("mouseenter", function() { clearTimeout(closeTimer); });
      fly.addEventListener("mouseleave", function() {
        closeTimer = setTimeout(function() { hideFly(flyId); }, 150);
      });
    }
  });

  // Mobile: tap sidebar link opens flyout inline instead
  items.forEach(function(item) {
    if (window.innerWidth <= 991) {
      item.addEventListener("click", function(e) {
        var flyId = item.getAttribute("data-fly");
        var fly = document.getElementById(flyId);
        if (!fly) return;
        var link = item.querySelector(".ip-sidebar-link");
        if (e.target === link || link.contains(e.target)) return; // let link navigate
        e.preventDefault();
        fly.classList.toggle("ip-flyout--visible");
      });
    }
  });
}

function ipCloseAllFlyouts() {
  document.querySelectorAll(".ip-flyout--visible").forEach(function(f) {
    f.classList.remove("ip-flyout--visible");
  });
}

/* ---- Highlight active page link ---- */
function ipMarkActive() {
  var page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".ip-sidebar-link, .ip-hlink").forEach(function(a) {
    if ((a.getAttribute("href") || "").toLowerCase() === page) {
      a.classList.add("ip-active");
    }
  });
}

navbar();

if (!document.getElementById("navbar-div")) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachNavbarDropdownBehavior);
  } else {
    attachNavbarDropdownBehavior();
  }
}
function attachNavbarDropdownBehavior(){
  var root = document.getElementById('navbar-div') || document;
  var dropdownItems = root.querySelectorAll('.navbar-full .nav-item.dropdown');
  var hasBootstrapDropdown = typeof bootstrap !== 'undefined' && bootstrap.Dropdown && typeof bootstrap.Dropdown.getOrCreateInstance === 'function';
  var hasBootstrapCollapse = typeof bootstrap !== 'undefined' && bootstrap.Collapse && typeof bootstrap.Collapse.getOrCreateInstance === 'function';

  function enableHover(d){
    if(!hasBootstrapDropdown) return;
    var toggle = d.querySelector('[data-bs-toggle="dropdown"]');
    if(!toggle) return;
    var bsDropdown = null;
    function show(){ bsDropdown = bsDropdown || bootstrap.Dropdown.getOrCreateInstance(toggle); bsDropdown.show(); }
    function hide(){ bsDropdown = bsDropdown || bootstrap.Dropdown.getOrCreateInstance(toggle); bsDropdown.hide(); }
    d.__navShow = show;
    d.__navHide = hide;
    d.addEventListener('mouseenter', show);
    d.addEventListener('mouseleave', hide);
  }

  function disableHover(d){
    if(d.__navShow) d.removeEventListener('mouseenter', d.__navShow);
    if(d.__navHide) d.removeEventListener('mouseleave', d.__navHide);
    d.__navShow = null; d.__navHide = null;
  }

  function setup(){
    var isDesktop = window.innerWidth > 991;
    dropdownItems.forEach(function(d){
      if(isDesktop) enableHover(d); else disableHover(d);
    });
  }

  // Close mobile navbar when a dropdown link is clicked
  root.querySelectorAll('.dropdown-menu a').forEach(function(a){
    a.addEventListener('click', function(){
      var navCollapse = document.querySelector('.navbar-collapse');
      if(hasBootstrapCollapse && navCollapse && navCollapse.classList.contains('show')){
        var bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
        bsCollapse.hide();
      }
    });
  });

  setup();
  window.addEventListener('resize', setup);
}

// On pages with inline navbar (no navbar-div), run hover setup directly
if(!document.getElementById('navbar-div')){
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', attachNavbarDropdownBehavior);
  } else {
    attachNavbarDropdownBehavior();
  }
}


// document.addEventListener("DOMContentLoaded", function(){
//     // make it as accordion for smaller screens
//     if (window.innerWidth > 992) {
//         document.querySelectorAll('.navbar .nav-item').forEach(function(everyitem){
    
//             everyitem.addEventListener('mouseover', function(e){
    
//                 let el_link = this.querySelector('a[data-bs-toggle]');
    
//                 if(el_link != null){
//                     let nextEl = el_link.nextElementSibling;
//                     el_link.classList.add('show');
//                     nextEl.classList.add('show');
//                 }
    
//             });
//             everyitem.addEventListener('mouseleave', function(e){
//                 let el_link = this.querySelector('a[data-bs-toggle]');
    
//                 if(el_link != null){
//                     let nextEl = el_link.nextElementSibling;
//                     el_link.classList.remove('show');
//                     nextEl.classList.remove('show');
//                 }
    
    
//             })
//         });
    
//     }
//     // end if innerWidth
//     }); 


// function handleNavImage(event,url,section){
//     if(section == "print&marketing"){
//       let img = document.getElementById("nav-img-print")
//       img.src= url;
  
//       let imgtext = document.getElementById("nav-img-text-print")
//       imgtext.innerText = event.target.innerText
//     }
//     else if(section == "fabric&fashion"){
//       let img = document.getElementById("nav-img-fabric")
//       img.src= url;
  
//       let imgtext = document.getElementById("nav-img-text-fabric")
//       imgtext.innerText = event.target.innerText
//     }
//     else if(section == "office&store_branding"){
//       let img = document.getElementById("nav-img-office")
//       img.src= url;
  
//       let imgtext = document.getElementById("nav-img-text-office")
//       imgtext.innerText = event.target.innerText
//     }
//     else if(section == "signages"){
//       let img = document.getElementById("nav-img-signage")
//       img.src= url;
  
//       let imgtext = document.getElementById("nav-img-text-signage")
//       imgtext.innerText = event.target.innerText
//     }
//     else if(section == "flags"){
//       let img = document.getElementById("nav-img-flags")
//       img.src= url;
  
//       let imgtext = document.getElementById("nav-img-text-flags")
//       imgtext.innerText = event.target.innerText
//     }
//     else if(section == "backdrop"){
//       let img = document.getElementById("nav-img-backdrop&exhibition")
//       img.src= url;
  
//       let imgtext = document.getElementById("nav-img-text-backdrop&exhibition")
//       imgtext.innerText = event.target.innerText
//     }
//     else if(section == "corporate"){
//       let img = document.getElementById("nav-img-corporate")
//       img.src= url;
  
//       let imgtext = document.getElementById("nav-img-text-corporate")
//       imgtext.innerText = event.target.innerText
//     }
    
// }


function handleNavImage(event, url, section) {

  if (section == "print&marketing") {
    let img = document.getElementById("nav-img-print");
    img.style.backgroundImage = `url(${url})`;

    let imgtext = document.getElementById("nav-img-text-print");
    imgtext.innerText = event.target.innerText;
  }
  else if (section == "fabric&fashion") {
    let img = document.getElementById("nav-img-fabric");
    img.style.backgroundImage = `url(${url})`;

    let imgtext = document.getElementById("nav-img-text-fabric");
    let text = event.target.innerText.replace("HOT", "").trim();

    imgtext.innerText = text
  }
  else if (section == "office&store_branding") {
    let img = document.getElementById("nav-img-office");
    img.style.backgroundImage = `url(${url})`;

    let imgtext = document.getElementById("nav-img-text-office");
    imgtext.innerText = event.target.innerText;
  }
  else if (section == "signages") {
    let img = document.getElementById("nav-img-signage");
    img.style.backgroundImage = `url(${url})`;
    console.log("signages")
    let imgtext = document.getElementById("nav-img-text-signage");
    imgtext.innerText = event.target.innerText;
  }
  else if (section == "flags") {
    let img = document.getElementById("nav-img-flags");
    img.style.backgroundImage = `url(${url})`;

    let imgtext = document.getElementById("nav-img-text-flags");
    imgtext.innerText = event.target.innerText;
  }
  else if (section == "backdrop") {
    let img = document.getElementById("nav-img-backdrop&exhibition");
    img.style.backgroundImage = `url(${url})`;

    let imgtext = document.getElementById("nav-img-text-backdrop&exhibition");
    imgtext.innerText = event.target.innerText;
  }
  else {
    let img = document.getElementById("nav-img-corporate");
    img.style.backgroundImage = `url(${url})`;

    let imgtext = document.getElementById("nav-img-text-corporate");
    imgtext.innerText = event.target.innerText;
  }
}



document.querySelectorAll('.hamburger').forEach(function(hamburger){
  hamburger.addEventListener('click', function(){
    this.classList.toggle('is-active');
  });
});



// const burger = document.querySelector('.burger');

// burger.addEventListener('click', () => {
//   burger.classList.toggle('active');
// });
// const navOpt = document.querySelector('.show');

// navOpt.addEventListener('click', () => {
//   burger.classList.toggle('active');
// });

//  onclick scroll for mobile view
// function printMarketing(){
//   if (window.innerWidth < 750) {
//     window.scrollTo(0,150)
//   }
// }
// function fabricFashion(){
//   if (window.innerWidth < 750) {
// window.scrollTo(0,200)
//   }
// }
// function officeStore(){
//     if (window.innerWidth < 750) {
//   window.scrollTo(0,250)
//     }
// }
// function signage(){
//     if (window.innerWidth < 750) {
//   window.scrollTo(0,300)
//     }
// }
// function flags(){
//     if (window.innerWidth < 750) {
//   window.scrollTo(0,350)
//     }
// }
// function backdropExhibition(){
//     if (window.innerWidth < 750) {
//   window.scrollTo(0,400)
//     }
// }
// function corporateGift(){
//     if (window.innerWidth < 750) {
//   window.scrollTo(0,450)
//     }
// }


// let ul = document.getElementById("search-list");
// let li = ul.getElementsByTagName("li");
// // let selected = 0;

// function handleSearch(search){

  
//     // console.log("search", search)

//     let searchResult = document.getElementById("search-result")
//     searchResult.style.visibility = "visible";

//     if(search === ""){
//         searchResult.style.visibility = "hidden";
//     }

//     var  filter, a, i;
//     input = document.getElementById("mySearch");
//     filter = search.toUpperCase();

//     // Loop through all list items, and hide those who don't match the search query
//     let count=0;
//     for (i = 0; i < li.length; i++) {
//       a = li[i].getElementsByTagName("a")[0];
//       if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
//         li[i].style.display = "";
//       } else {
//         li[i].style.display = "none";
//         // li[i].remove();
//         count++;
//       }
//     }
    
//     if(count >= li.length){
//       // searchResult.innerHTML = null
//       console.log(count, li.lengthf)
//       document.getElementById("product-not-found").style.display= "block";
//     }
//     else{
//       document.getElementById("product-not-found").style.display= "none";
//     }
//     // selectSearch()
// }
 

// // function selectSearch(){
// //   li[selected].style.background= "#c9c9c9"
// //   console.log(document.getElementById("search-list"))
// // }


// window.addEventListener('mouseup',function(event){
//     let searchright = document.getElementById("searchright")
//     let searchResult = document.getElementById("search-result")
//     searchright.value=""
//     handleSearch("")
//     // if(event.target != searchright && event.target.parentNode != searchright){
//     //     searchResult.style.display = 'hidden';
//     // }
//     // console.log(event.target,searchright)
// });  







//Use arrow up/down to go through choices
const navbarSearchRoot = document.getElementById('navbar-div') || document.querySelector('.contact-container') || document;
const search = navbarSearchRoot.querySelector('.searchBar');
const results = [
    {
      "name": "Corporate Gifts",
      "link": "promotional-corporate-gifts.html"
    },
    {
      "name": "Flags",
      "link": "flags-printing-branding.html"
    },
    {
      "name": "Backdrops",
      "link": "backdrop-stand.html"
    },
    {
      "name": "Office & Store Branding",
      "link": "office-store-branding-printing.html"
    },
    {
      "name": "Business cards",
      "link": "digital-business-cards.html"
    },
    {
      "name": "Standard business cards",
      "link": "business-cards-printing.html"
    },
    {
      "name": "Bristol Pack Business Cards",
      "link": "bristol-business-cards.html"
    },
    {
      "name": "Executive Business Cards",
      "link": "laminated-business-cards.html"
    },
    {
      "name": "Pearl White Business Cards",
      "link": "pearl-white-business-cards-printing.html"
    },
    {
      "name": "PVC Plastic Business Cards",
      "link": "pvc-plastic-business-cards-printing.html"
    },
    {
      "name": "Kraft Business Cards",
      "link": "kraft-business-cards-in.html#kraft"
    },
    {
      "name": "Recycled Business Cards",
      "link": "kraft-business-cards-in.html"
    },
    {
      "name": "Recycled Eco Friendly Business Cards",
      "link": "kraft-business-cards-in.html#eco_friendly"
    },
    {
      "name": "Classic - Conqueror Business Cards",
      "link": "classic-business-cards.html"
    },
    {
      "name": "Classic Ice-Gold Business Cards",
      "link": "classic-ice-gold-business-cards.html"
    },
    {
      "name": "Velvet Business Cards",
      "link": "velvet-business-cards.html"
    },
    {
      "name": "Textured Business Cards",
      "link": "offset-business-cards.html"
    },
    {
      "name": "Translucent Business Cards",
      "link": "translucent_business_cards.html"
    },
    {
      "name": "3D Spot UV Business Cards",
      "link": "uv-business-cards.html"
    },
    {
      "name": "3D Foil Business Cards",
      "link": "luxury-business-cards.html"
    },
    {
      "name": "3D Spot UV & 3D Foil Business Cards",
      "link": "royal-business-cards.html"
    },
    {
      "name": "Letterheads",
      "link": "letter-heads-printing.html"
    },
    {
      "name": "Envelopes",
      "link": "envelopes-printing.html"
    },
    {
      "name": "Folders",
      "link": "folders-printing.html"
    },
    {
      "name": "Notepads",
      "link": "notepads-printing.html"
    },
    {
      "name": "Glue Bound Notepads",
      "link": "notepads-printing.html"
    },
    {
      "name": "Spiral Notebooks",
      "link": "notepads-printing.html#spiral"
    },
    {
      "name": "Perforated Notepads",
      "link": "notepads-printing.html#perforated"
    },
    {
      "name": "Note Cubes",
      "link": "notepads-printing.html#cubes"
    },
    {
      "name": "Notebooks & Journal",
      "link": "customized-notebooks.html"
    },
    {
      "name": "Custom Notebooks",
      "link": "customized-notebooks.html"
    },
    {
      "name": "Raised Foiling 3D Notebooks",
      "link": "customized-notebooks.html#raised_foiling"
    },
    {
      "name": "Raised Spot 3D Notebooks",
      "link": "customized-notebooks.html#raised_spot"
    },
    {
      "name": "Yearly Diaries",
      "link": "customized-notebooks.html#diaries"
    },
    {
      "name": "Scribble Books",
      "link": "customized-notebooks.html#scribble"
    },
    {
      "name": "Kraft Cover Notebooks",
      "link": "customized-notebooks.html#kraft_cover"
    },
    {
      "name": "Paper Cover Notebooks",
      "link": "customized-notebooks.html#paper_cover"
    },
    {
      "name": "Wraparound Notebooks",
      "link": "customized-notebooks.html#wraparound"
    },
    {
      "name": "Binding",
      "link": "binding.html"
    },
    {
      "name": "Section Sewing Binding",
      "link": "binding.html"
    },
    {
      "name": "Wire Binding",
      "link": "binding.html"
    },
    {
      "name": "Comb Binding",
      "link": "binding.html"
    },
    {
      "name": "Saddle Binding",
      "link": "binding.html"
    },
    {
      "name": "Thank You Cards",
      "link": "thank-you-cards-printing.html"
    },
    {
      "name": "Certificates",
      "link": "certificates-printing.html"
    },
    {
      "name": "Calendars",
      "link": "calendars-printing.html"
    },
    {
      "name": "Seals",
      "link": "digital-printing-services.html#seals"
    },
    {
      "name": "Self Ink Stamps",
      "link": "stamps.html"
    },
    {
      "name": "Round Shape Stamps",
      "link": "round-stamps.html"
    },
    {
      "name": "Oval Shape Stamps",
      "link": "oval-stamps.html"
    },
    {
      "name": "Rectangle Shape Stamps",
      "link": "rectangle-stamps.html"
    },
    {
      "name": "Square Shape Stamps",
      "link": "square-stamps.html"
    },
    {
      "name": "Date Stamps",
      "link": "date-numbering-stamps.html"
    },
    {
      "name": "Date & Time Stamps",
      "link": "date-numbering-stamps.html"
    },
    {
      "name": "Manual Numbering Stamps",
      "link": "date-numbering-stamps.html"
    },
    {
      "name": "Readymade Stamps",
      "link": "readymade-stamps.html"
    },
    {
      "name": "Wax Seal",
      "link": "wax-seal.html"
    },
    {
      "name": "Self-Adhesive Stickers",
      "link": "wax-seal.html#self_adhesive"
    },
    {
      "name": "Embossing Seal",
      "link": "embossing-seal.html"
    },
    {
      "name": "Voucher Books",
      "link": "digital-printing-services.html#voucherbooks"
    },
    {
      "name": "Invoice Books",
      "link": "invoice-books.html"
    },
    {
      "name": "Payment Vouchers",
      "link": "payment-voucher.html"
    },
    {
      "name": "Receipt Vouchers",
      "link": "receipt-voucher.html"
    },
    {
      "name": "Petty Cash Vouchers",
      "link": "petty-cash-voucher.html"
    },
    {
      "name": "LPO Books",
      "link": "lpo-books.html"
    },
    {
      "name": "Delivery Order Books",
      "link": "delivery-order.html"
    },
    {
      "name": "Brochures & Flyers",
      "link": "digital-printing-services.html#brouchersandflyers"
    },
    {
      "name": "Brochures",
      "link": "brochures-printing.html"
    },
    {
      "name": "Flyers",
      "link": "flyers-printing.html"
    },
    {
      "name": "A6 Flyers",
      "link": "flyers-printing.html"
    },
    {
      "name": "DL Flyers",
      "link": "flyers-printing.html#dl_flyer"
    },
    {
      "name": "A5 Flyers",
      "link": "flyers-printing.html#a5_flyer"
    },
    {
      "name": "A4 Flyers",
      "link": "flyers-printing.html#a4_flyer"
    },
    {
      "name": "Bi-Fold / Tri-Fold Flyers",
      "link": "flyers-printing.html#bi_fold"
    },
    {
      "name": "Booklets & catalogues",
      "link": "catalogues-printing.html"
    },
    {
      "name": "CD or DVD printing",
      "link": "cd-printing.html"
    },
    {
      "name": "CD or DVD Covers printing",
      "link": "cd-covers-printing.html"
    },
    {
      "name": "Hang Tags",
      "link": "hang_tags_printing.html"
    },
    {
      "name": "Shape Cut Tags",
      "link": "hang_tags_printing.html"
    },
    {
      "name": "Folded Tags",
      "link": "hang_tags_printing.html"
    },
    {
      "name": "Kraft Tags",
      "link": "hang_tags_printing.html#kraft_tags"
    },
    {
      "name": "Translucent Tags",
      "link": "hang_tags_printing.html"
    },
    {
      "name": "Crowd Promotions",
      "link": "digital-printing-services.html#crowd_promotions"
    },
    {
      "name": "Compliment Slips",
      "link": "compliment-slips.html"
    },
    {
      "name": "Tickets | Coupons | Gift certificates | Vouchers",
      "link": "coupons-printing.html"
    },
    {
      "name": "Scratch And Win Cards",
      "link": "scratch-win-cards.html"
    },
    {
      "name": "Tent Cards",
      "link": "tent-cards.html"
    },
    {
      "name": "Name Tent Cards",
      "link": "tent-cards.html"
    },
    {
      "name": "Table Talkers",
      "link": "tent-cards.html#table_talker"
    },
    {
      "name": "Car Mat",
      "link": "car-mat.html"
    },
    {
      "name": "Table Mat",
      "link": "table-mat.html"
    },
    {
      "name": "Stickers",
      "link": "stickers-printing.html"
    },
    {
      "name": "Die Cut Stickers",
      "link": "stickers-prices.html"
    },
    {
      "name": "Raised Glossy Stickers",
      "link": "stickers-prices.html"
    },
    {
      "name": "Print And Cut Stickers",
      "link": "print-and-cut-stickers.html"
    },
    {
      "name": "Paper Stickers (Gloss/Matt)",
      "link": "paper-stickers.html"
    },
    {
      "name": "Transparent Stickers",
      "link": "transparent-stickers.html"
    },
    {
      "name": "Clear Stickers",
      "link": "transparent-stickers.html"
    },
    {
      "name": "PVC Stickers White",
      "link": "pvc-stickers.html"
    },
    {
      "name": "White Ink Sticker",
      "link": "white-ink-stickers.html"
    },
    {
      "name": "Epoxy Stickers",
      "link": "epoxy-stickers.html"
    },
    {
      "name": "Windshield Stickers",
      "link": "windshield-stickers.html"
    },
    {
      "name": "Stencil Stickers",
      "link": "stencil-stickers.html"
    },
    {
      "name": "Foil Stickers",
      "link": "foil-stickers.html"
    },
    {
      "name": "Metal Stickers",
      "link": "metal-stickers.html"
    },
    {
      "name": "PVC White Helmet Stickers",
      "link": "helmet-stickers.html"
    },
    {
      "name": "Hologram Sticker",
      "link": "hologram-stickers-printing.html"
    },
    {
      "name": "Kraft Paper Sticker",
      "link": "kraft-paper-stickers.html"
    },
    {
      "name": "Textile Printing",
      "link": "textile-roll-printing.html"
    },
    {
      "name": "Fashion",
      "link": "fabric-and-fashion-printing.html#fashion"
    },
    {
      "name": "Textile Role Printing",
      "link": "textile-roll-printing.html"
    },
    {
      "name": "Haute Couture",
      "link": "textile-roll-printing.html#haute_couture"
    },
    {
      "name": "Velora Crepe",
      "link": "textile-roll-printing.html#haute_couture"
    },
    {
      "name": "Stretch Crepe",
      "link": "textile-roll-printing.html#haute_couture"
    },
    {
      "name": "Butterfly Crepe",
      "link": "textile-roll-printing.html#haute_couture"
    },
    {
      "name": "Mirror Silk",
      "link": "textile-roll-printing.html#haute_couture"
    },
    {
      "name": "Silk Touch",
      "link": "textile-roll-printing.html#haute_couture"
    },
    {
      "name": "Silk Impression",
      "link": "textile-roll-printing.html#haute_couture"
    },
    {
      "name": "Poly Cotton",
      "link": "textile-roll-printing.html#haute_couture"
    },
    {
      "name": "Poly Voile",
      "link": "textile-roll-printing.html#haute_couture"
    },
    {
      "name": "Peach Chiffon",
      "link": "textile-roll-printing.html#haute_couture"
    },
    {
      "name": "Scarf",
      "link": "scarf-fashion.html"
    },
    {
      "name": "Head Scarf",
      "link": "scarf-fashion.html#head_scarf"
    },
    {
      "name": "Neck Scarf",
      "link": "scarf-fashion.html#neck_scarf"
    },
    {
      "name": "Twill Scarf",
      "link": "scarf-fashion.html#twill_scarf"
    },
    {
      "name": "Sheila",
      "link": "sheila-fashion.html"
    },
    {
      "name": "Sheila Hijab",
      "link": "sheila-fashion.html"
    },
    {
      "name": "Bandana",
      "link": "bandana-fashion.html"
    },
    {
      "name": "Neck Cowl",
      "link": "bandana-fashion.html"
    },
    {
      "name": "Hair Scarf",
      "link": "hair-scarf-printing.html"
    },
    {
      "name": "Abaya",
      "link": "abaya-fashion.html"
    },
    {
      "name": "Sarong - Beach Wear",
      "link": "sarong-fashion.html"
    },
    {
      "name": "Beach Short",
      "link": "beach-shorts-fashion.html"
    },
    {
      "name": "Beach Chairs",
      "link": "beach-chair.html"
    },
    {
      "name": "Pocket Handkerchief",
      "link": "pocket-handkerchief-fashion.html"
    },
    {
      "name": "Scrunchie",
      "link": "scrunchies-fashion.html"
    },
    {
      "name": "Bag Scarf",
      "link": "bag-scarf-fashion.html"
    },
    {
      "name": "Pillow & Cushion Covers",
      "link": "soft-furnish-pillow-cushion-printing.html"
    },
    {
      "name": "Throw Cushion",
      "link": "soft-furnish-pillow-cushion-printing.html#embroidery_pillow"
    },
    {
      "name": "Embroidered Pillows",
      "link": "soft-furnish-pillow-cushion-printing.html#throw_cushion"
    },
    {
      "name": "Velvet Cushion",
      "link": "soft-furnish-pillow-cushion-printing.html#velvet_cushion"
    },
    {
      "name": "Shaped cushion",
      "link": "soft-furnish-pillow-cushion-printing.html#shaped_cushion"
    },
    {
      "name": "Cotton Cushion",
      "link": "soft-furnish-pillow-cushion-printing.html#cotton_cushion"
    },
    {
      "name": "Floor Cushion",
      "link": "soft-furnish-pillow-cushion-printing.html#floor_cushion"
    },
    {
      "name": "Tiny Cushion",
      "link": "soft-furnish-pillow-cushion-printing.html#tiny_cushion"
    },
    {
      "name": "Bolster Pillow",
      "link": "soft-furnish-pillow-cushion-printing.html#bolster_pillow"
    },
    {
      "name": "Bean bags",
      "link": "soft-furnish-bean-bag.html"
    },
    {
      "name": "Blanket",
      "link": "blanket-soft-furnish.html"
    },
    {
      "name": "Fabric Gift Wrap",
      "link": "fabric-wrap.html"
    },
    {
      "name": "Curtains",
      "link": "curtains.html"
    },
    {
      "name": "Table Placemats",
      "link": "dining-table-placemat.html"
    },
    {
      "name": "Table Napkin",
      "link": "table-napkin.html"
    },
    {
      "name": "Cocktail Napkin",
      "link": "table-napkin.html#cocktail_napkin"
    },
    {
      "name": "Dining Table Cloth",
      "link": "dining-table-cloth.html"
    },
    {
      "name": "Dining Table Runner",
      "link": "dining-table-cloth.html"
    },
    {
      "name": "Lifestyle",
      "link": "fabric-and-fashion-printing.html#lifestyle"
    },
    {
      "name": "Armband",
      "link": "armband-printing.html"
    },
    {
      "name": "Sash",
      "link": "sash-fashion.html"
    },
    {
      "name": "Hand Umbrella",
      "link": "hand-umbrella-printing.html"
    },
    {
      "name": "Custom Face Mask",
      "link": "custom-face-mask.html#smartfit"
    },
    {
      "name": "Smart Fit Face Mask",
      "link": "custom-face-mask.html#smartfit"
    },
    {
      "name": "Apron",
      "link": "dining-apron.html"
    },
    {
      "name": "Beach Towel",
      "link": "beach-towels.html"
    },
    {
      "name": "Pool Towel",
      "link": "beach-towels.html#pool_towel"
    },
    {
      "name": "Face Towel",
      "link": "beach-towels.html#face_towel"
    },
    {
      "name": "Tea Towel",
      "link": "beach-towels.html#tea_towel"
    },
    {
      "name": "Personalized Towel",
      "link": "beach-towels.html#personalized_towel"
    },
    {
      "name": "Embroidered Towels",
      "link": "beach-towels.html#embroidered_towel"
    },
    {
      "name": "Jewelry Pouch (drawstring)",
      "link": "draw-string-pouches.html"
    },
    {
      "name": "Jute Pouches",
      "link": "draw-string-pouches.html#jute_pouches"
    },
    {
      "name": "Tote Pouches",
      "link": "draw-string-pouches.html#tote_pouches"
    },
    {
      "name": "Velvet Pouches",
      "link": "draw-string-pouches.html#velvet_pouches"
    },
    {
      "name": "Velvet Pouches",
      "link": "draw-string-pouches.html#fabric_pouches"
    },
    {
      "name": "Zipper Pouches",
      "link": "draw-string-pouches.html#zipper_pouches"
    },
    {
      "name": "Fabric Pouches",
      "link": "draw-string-pouches.html#fabric_pouches"
    },
    {
      "name": "Silk Sensation Pouches",
      "link": "draw-string-pouches.html#silk"
    },
    {
      "name": "Matt Satin Pouches",
      "link": "draw-string-pouches.html#matt"
    },
    {
      "name": "Linen Pouches",
      "link": "draw-string-pouches.html#linen"
    },
    {
      "name": "Woven Fabric Labels",
      "link": "woven-labels.html"
    },
    {
      "name": "Damask Woven Labels",
      "link": "woven-labels.html#damask"
    },
    {
      "name": "Satin Labels",
      "link": "woven-labels.html#satin"
    },
    {
      "name": "Synthetic Label",
      "link": "woven-labels.html#synthetic"
    },
    {
      "name": "All Fabrics",
      "link": "all-fabrics-printing.html"
    },
    {
      "name": "Fabric Range",
      "link": "all-fabrics-printing.html"
    },
    {
      "name": "All Patterns",
      "link": "all-pattern-templates.html"
    },
    {
      "name": "Office & Store Branding",
      "link": "office-store-branding-printing.html"
    },
    {
      "name": "Frosted Stickers",
      "link": "office-store-branding-printing.html"
    },
    {
      "name": "Reverse Cut Frosted Sticker",
      "link": "frosted-glass-sticker.html#reverse_cut"
    },
    {
      "name": "Standard Cut Frosted Sticker",
      "link": "frosted-glass-sticker.html#standard_cut"
    },
    {
      "name": "Printed Frosted Sticker",
      "link": "frosted-glass-sticker.html#printed"
    },
    {
      "name": "Blank Frosted Sticker",
      "link": "frosted-glass-sticker.html#blank"
    },
    {
      "name": "Gradient Frosted Sticker",
      "link": "frosted-glass-sticker.html#gradient"
    },
    {
      "name": "Window Branding",
      "link": "office-store-branding-printing.html#window_branding"
    },
    {
      "name": "Window Vinyl Lettering",
      "link": "window-vinyl-lettering.html"
    },
    {
      "name": "Window Graphics",
      "link": "window-graphics.html"
    },
    {
      "name": "Clear Window Decal",
      "link": "window-graphics.html"
    },
    {
      "name": "Opaque Window Decal",
      "link": "window-graphics.html#opaque"
    },
    {
      "name": "One Way Vision Sticker",
      "link": "one-way-vision-sticker.html"
    },
    {
      "name": "Window Films",
      "link": "decorative-window-film.html"
    },
    {
      "name": "Tinted Window Film",
      "link": "decorative-window-film.html"
    },
    {
      "name": "Floor Stickers",
      "link": "office-store-branding-printing.html#floor_sticker"
    },
    {
      "name": "Floor Graphics Stickers",
      "link": "floor-graphic-sticker.html"
    },
    {
      "name": "Floor Direction Stickers",
      "link": "floor-graphic-sticker.html"
    },
    {
      "name": "Floor Sale Stickers",
      "link": "floor-graphic-sticker.html"
    },
    {
      "name": "Floor Branding Stickers",
      "link": "floor-graphic-sticker.html"
    },
    {
      "name": "Footprint Floor Stickers",
      "link": "floor-graphic-sticker.html"
    },
    {
      "name": "Wall Branding",
      "link": "office-store-branding-printing.html#wallbranding"
    },
    {
      "name": "Wall Vinyl Lettering",
      "link": "wall-vinyl-lettering.html"
    },
    {
      "name": "Wall Stickers",
      "link": "wall-graphics.html"
    },
    {
      "name": "Wall Decal",
      "link": "wall-graphics.html#wall_decal"
    },
    {
      "name": "Pillar Branding",
      "link": "pillar-branding.html"
    },
    {
      "name": "Wall Décor",
      "link": "office-store-branding-printing.html#walldecor"
    },
    {
      "name": "Wallpaper",
      "link": "wallpaper-printing.html"
    },
    {
      "name": "Bedroom Wallpaper",
      "link": "wallpaper-printing.html#bedroom"
    },
    {
      "name": "Kids Room Wallpaper",
      "link": "wallpaper-printing.html#kidsroom"
    },
    {
      "name": "Living Room Wallpaper",
      "link": "wallpaper-printing.html#livingroom"
    },
    {
      "name": "Kitchen Wallpaper",
      "link": "wallpaper-printing.html#kitchen"
    },
    {
      "name": "Office Wallpaper",
      "link": "wallpaper-printing.html#office"
    },
    {
      "name": "Wall Frames",
      "link": "office-store-branding-printing.html#canvas"
    },
    {
      "name": "Canvas Frames",
      "link": "canvas-printing.html"
    },
    {
      "name": "Wooden Frames",
      "link": "wooden-frames-printing.html"
    },
    {
      "name": "Acrylic Frames",
      "link": "acrylic-frames-printing.html"
    },
    {
      "name": "Metal Art",
      "link": "metal-frames-printing.html"
    },
    {
      "name": "POS Display Stand/Unit",
      "link": "pos-display-stand.html"
    },
    {
      "name": "Counter Display",
      "link": "pos-display-stand.html#counter_display"
    },
    {
      "name": "Pedestal Stand",
      "link": "pos-display-stand.html#pedestal_stand"
    },
    {
      "name": "Poster Printing",
      "link": "posters-printing.html"
    },
    {
      "name": "Mounted Posters",
      "link": "posters-printing.html#mounted"
    },
    {
      "name": "Acrylic Poster",
      "link": "posters-printing.html#acrylic"
    },
    {
      "name": "Poster Hangers",
      "link": "posters-printing.html#hanger"
    },
    {
      "name": "Repositionable Cling",
      "link": "office-store-branding-printing.html#repositionable_cling"
    },
    {
      "name": "Clear Static Cling",
      "link": "repositionable-cling.html#clear_static_clin"
    },
    {
      "name": "Clear Static With White Ink",
      "link": "repositionable-cling.html#clear_static_white_ink"
    },
    {
      "name": "White Static Cling",
      "link": "repositionable-cling.html#white_static_cling"
    },
    {
      "name": "Shape Cutout Cling",
      "link": "repositionable-cling.html#shape_cut_out_cling"
    },
    {
      "name": "Workplace",
      "link": "office-store-branding-printing.html#workplace"
    },
    {
      "name": "Social Distancing Screen Divider",
      "link": "social-distancing-screen-divider.html"
    },
    {
      "name": "Counter Partition",
      "link": "social-distancing-screen-divider.html"
    },
    {
      "name": "Office Desk Partition",
      "link": "social-distancing-screen-divider.html#restaurant"
    },
    {
      "name": "Acrylic Partition Stand",
      "link": "social-distancing-screen-divider.html#desk_partition"
    },
    {
      "name": "Vehicle Graphics",
      "link": "office-store-branding-printing.html#vehicle_graphics"
    },
    {
      "name": "Car Door Branding",
      "link": "vehicle-branding.html"
    },
    {
      "name": "Half wrap vehicle branding",
      "link": "vehicle-branding.html#half_wrap"
    },
    {
      "name": "Full Wrap Van branding",
      "link": "vehicle-branding.html#bus_branding"
    },
    {
      "name": "Golf Cart Branding",
      "link": "vehicle-branding.html#golf_cart"
    },
    {
      "name": "Boat / Yachts Sticker",
      "link": "boat-yacht-sticker.html"
    },
    {
      "name": "Magnetic Sheet",
      "link": "magnetic-sheet-printing.html"
    },
    {
      "name": "Car Magnets",
      "link": "magnetic-sheet-printing.html#car"
    },
    {
      "name": "Fridge Magnets",
      "link": "magnetic-sheet-printing.html#fridge"
    },
    {
      "name": "Magnetic Wall",
      "link": "magnetic-sheet-printing.html#wall"
    },
    {
      "name": "Domed Magnet (Epoxy)",
      "link": "magnetic-sheet-printing.html#domed"
    },
    {
      "name": "Silicone Fridge Magnet",
      "link": "magnetic-sheet-printing.html#silicone-magnet"
    },
    {
      "name": "Ceremonial Ribbon",
      "link": "ceremonial_ribbons.html"
    },
    {
      "name": "Forex Scissor",
      "link": "ceremonial_ribbons.html#forex_scissor"
    },
    {
      "name": "All Signages",
      "link": "signage-company-in.html"
    },
    {
      "name": "3D Indoor / Outdoor Signage",
      "link": "signage-company-in.html"
    },
    {
      "name": "3D Signage (Unlit)",
      "link": "unlit-3d-signage.html"
    },
    {
      "name": "Sign Board",
      "link": "unlit-3d-signage.html#sign_board"
    },
    // {
    //   "name": "Frontlit 3D Signage",
    //   "link": "frontlit-3d-sign-board.html"
    // },
    {
      "name": "Backlit Signage",
      "link": "backlit-3d-signage.html"
    },
    {
      "name": "Outlit 3D Signage",
      "link": "outlit-3d-signage.html"
    },
    // {
    //   "name": "Push Through 3D Signage",
    //   "link": "push-through-sign-board.html"
    // },
    // {
    //   "name": "Neon 3D Signage",
    //   "link": "neon-sign-board.html"
    // },
    {
      "name": "Flex Face Signage",
      "link": "flex-face-sign-board.html"
    },
    {
      "name": "Digital Printed Flex Face Sign Board",
      "link": "flex-face-sign-board.html#digital_printed"
    },
    {
      "name": "Vinyl Cut Letters Flex Face Sign Board",
      "link": "flex-face-sign-board.html#vinyl_cut"
    },
    {
      "name": "Frontlit Pole Sign",
      "link": "flex-face-sign-board.html#frontlit"
    },
    {
      "name": "Frontlit Signage",
      "link": "frontlit-3d-sign-board.html"
    },
    {
      "name": "Metal Cladding Board with Acrylic Letters",
      "link": "frontlit-3d-sign-board.html#metal_cladding"
    },
    {
      "name": "ACP Cladding with Frontlit Channelium Letters",
      "link": "frontlit-3d-sign-board.html#acp_cladding"
    },
    {
      "name": "Acrylic Box Sign Board",
      "link": "frontlit-3d-sign-board.html#acrylic_box"
    },
    {
      "name": "SS Mirror Finish + Acrylic",
      "link": "frontlit-3d-sign-board.html#ss_mirror"
    },
    {
      "name": "SS Chrome Gold Finish + Acrylic",
      "link": "frontlit-3d-sign-board.html#ss_chrome"
    },
    {
      "name": "Aluminum Powder Coated + Acrylic",
      "link": "frontlit-3d-sign-board.html#aluminum_powder"
    },
    // {
    //   "name": "Backlit 3D Sign Board",
    //   "link": "backlit-3d-signage.html"
    // },
    {
      "name": "Push Through Signage",
      "link": "push-through-sign-board.html"
    },
    {
      "name": "Aluminum Box with Acrylic Letters",
      "link": "push-through-sign-board.html#aluminum_box"
    },
    {
      "name": "SS Box with Acrylic + SS Letters",
      "link": "push-through-sign-board.html#ss_box"
    },
    {
      "name": "Metal Box with Acrylic Letters",
      "link": "push-through-sign-board.html#metal_box"
    },
    {
      "name": "ACP Box with SS Outlit Letters",
      "link": "push-through-sign-board.html#acp_box"
    },
    {
      "name": "ACP Box + Acrylic Letters",
      "link": "push-through-sign-board.html#acp_box_acrylic"
    },
    {
      "name": "Metal + Acrylic Box with Reverse Letters",
      "link": "push-through-sign-board.html#metal_acrylic_box"
    },
    {
      "name": "Neon Signage",
      "link": "neon-sign-board.html"
    },
    {
      "name": "Acrylic Base with LED Neon Letters",
      "link": "neon-sign-board.html#acrylic_base"
    },
    {
      "name": "SS Reverse Letters with LED Neon",
      "link": "neon-sign-board.html#ss_reverse"
    },
    {
      "name": "Aluminum Box with LED Neon",
      "link": "neon-sign-board.html#aluminum_box"
    },
    {
      "name": "Acrylic with LED Neon Fascia Sign",
      "link": "neon-sign-board.html#acrylic_fascia"
    },
    {
      "name": "Metal Box with LED Neon (Fascia)",
      "link": "neon-sign-board.html#metal_box"
    },
    {
      "name": "Metal Frame with Neon Letters",
      "link": "neon-sign-board.html#metal_frame"
    },
    {
      "name": "Light Box Signage",
      "link": "signage-company-in.html#lightbox"
    },
    {
      "name": "Flex Face Signs (Light Box)",
      "link": "flex-face-light-box.html"
    },
    {
      "name": "Digital Printed Flex Face Light Box",
      "link": "flex-face-light-box.html#digital_printed"
    },
    {
      "name": "Vinyl Cut Letters Flex Face Light Box",
      "link": "flex-face-light-box.html#vinly_cut"
    },
    {
      "name": "Flex Face Light Box for Pole Sign",
      "link": "flex-face-light-box.html#flex_face"
    },
    {
      "name": "Flex Face Light Box for Side Board",
      "link": "flex-face-light-box.html#flex_face_side"
    },
    {
      "name": "Flex Face Light Box for Wall",
      "link": "flex-face-light-box.html#flex_face_wall"
    },
    {
      "name": "Unipole Flex Face Light Box",
      "link": "flex-face-light-box.html#unipole"
    },
    {
      "name": "Fabric Light Box",
      "link": "fabric-light-box.html"
    },
    {
      "name": "Wall Light Box",
      "link": "fabric-light-box.html#wall_light"
    },
    {
      "name": "Ceiling Light Box",
      "link": "fabric-light-box.html#ceiling_light_box"
    },
    {
      "name": "Hanging Light Box",
      "link": "fabric-light-box.html#handing_light_box"
    },
    {
      "name": "Pillar Light Box",
      "link": "fabric-light-box.html#pillar_light_box"
    },
    {
      "name": "Acrylic Signage Board",
      "link": "acrylic-light-box.html"
    },
    {
      "name": "Metal Light Box with Digital Printing",
      "link": "acrylic-light-box.html#metal_light_box"
    },
    {
      "name": "Wooden Light Box with Digital Print",
      "link": "acrylic-light-box.html#wooden_light_box"
    },
    {
      "name": "Cutout Light Box Logo",
      "link": "acrylic-light-box.html#cutout_light_box"
    },
    {
      "name": "Aluminum & Acrylic Light Box",
      "link": "acrylic-light-box.html#acrylic_light_box"
    },
    {
      "name": "Acrylic Light Box Podium / Cubes",
      "link": "acrylic-light-box.html#acrylic_light_box_podium"
    },
    {
      "name": "Backlit Wall Sign Digital Print on Acrylic",
      "link": "acrylic-light-box.html#backlit_wall_sign"
    },
    {
      "name": "Poster Light Box",
      "link": "poster-light-box.html"
    },
    {
      "name": "Aluminum Snap Frame with Duratrance",
      "link": "poster-light-box.html#aluminum_snap_frame"
    },
    {
      "name": "Wooden Light Box with Poster",
      "link": "poster-light-box.html#wooden_light_box"
    },
    {
      "name": "Metal Light Box with Duratrance",
      "link": "poster-light-box.html#metal_light_box"
    },
    {
      "name": "Menu Poster Board + Duratrance",
      "link": "poster-light-box.html#menu_poster_board"
    },
    {
      "name": "Acrylic LED Frame with Duratrance",
      "link": "poster-light-box.html#acrylic_led_frame"
    },
    {
      "name": "Wooden Light Box with Duratrance",
      "link": "poster-light-box.html#wooden_light_box_duratrance"
    },
    {
      "name": "Direction / Wayfinding Signage",
      "link": "signage-company-in.html#direction"
    },
    {
      "name": "Wayfinding Signage",
      "link": "wayfinding-signs.html"
    },
    {
      "name": "Metal Direction Signage",
      "link": "wayfinding-signs.html#metal_direction"
    },
    {
      "name": "Stainless Steel Signage",
      "link": "wayfinding-signs.html#stainless_steel"
    },
    {
      "name": "Wooden Wayfinding Signage",
      "link": "wayfinding-signs.html#wooden_wayfinding"
    },
    {
      "name": "Acrylic Wayfinding Signage",
      "link": "wayfinding-signs.html#acrylic_wayfinding"
    },
    {
      "name": "Backlit Direction / Wayfinding Signage",
      "link": "wayfinding-signs.html#backlit_direction"
    },
    {
      "name": "Digital Direction / Wayfinding Signage",
      "link": "wayfinding-signs.html#digital_direction"
    },
    // {
    //   "name": "Self Standing Signage",
    //   "link": "wayfinding-signs.html#self_standing"
    // },
    // {
    //   "name": "Self-Standing Signage",
    //   "link": "self-standing-sign.html"
    // },
    {
      "name": "Wall Mounted Signage",
      "link": "wall-mounted-signage.html"
    },
    {
      "name": "Metal Plate with Engraved / Colored Letters",
      "link": "wall-mounted-signage.html#metal_plate"
    },
    // {
    //   "name": "Aluminum Profile with Vinyl Letters",
    //   "link": "wall-mounted-signage.html#aluminum_profile"
    // },
    {
      "name": "Acrylic Cut letters / Icons",
      "link": "wall-mounted-signage.html#acrylic_cut"
    },
    {
      "name": "Wooden with Engraved Letters",
      "link": "wall-mounted-signage.html#wooden_with_engraved"
    },
    {
      "name": "ACP Box with Vinyl Cut Letters",
      "link": "wall-mounted-signage.html#acp_box"
    },
    {
      "name": "Metal Light Box with Acrylic Letters",
      "link": "wall-mounted-signage.html#metal_light_box"
    },
    
    {
      "name": "Acrylic with Vinyl Cut Letters",
      "link": "wall-mounted-signage.html#acrylic_with_vinyl"
    },
    {
      "name": "Acrylic + SS with Revers Cut Letters",
      "link": "wall-mounted-signage.html#acrylic_ss_revers"
    },
    {
      "name": "Hanging Signage",
      "link": "hanging-signage.html"
    },
    {
      "name": "SS with Electro Plating",
      "link": "hanging-signage.html#ss_electro"
    },
    {
      "name": "Aluminum Light Box with Acrylic",
      "link": "hanging-signage.html#aluminum_light_box"
    },
    {
      "name": "Aluminum Profile with Digital Printing",
      "link": "hanging-signage.html#aluminum_profile"
    },
    {
      "name": "Aluminum Box with 3D Acrylic Letters",
      "link": "hanging-signage.html#aluminum_box"
    },
    {
      "name": "Wooden + Acrylic Plate with Vinyl Letters",
      "link": "hanging-signage.html#wooden_acrylic"
    },
    {
      "name": "Acrylic with Digital Printed Vinyl",
      "link": "hanging-signage.html#acrylic_with_digital"
    },
    {
      "name": "Wooden with Engraving & Coloring",
      "link": "hanging-signage.html#wooden_with_engraving"
    },
    {
      "name": "ACP Sheet with Digital Printed Vinyl",
      "link": "hanging-signage.html#acp_sheet"
    },
    {
      "name": "Directory Signage",
      "link": "directory-signage.html"
    },
    {
      "name": "Acrylic + SS Plates + Vinyl Cut Letters",
      "link": "directory-signage.html#acrylic_ss"
    },
    {
      "name": "Frosted Acrylic + Vinyl Cut Letters",
      "link": "directory-signage.html#frosted_acrylic"
    },
    {
      "name": "Wooden Base + Acrylic Plates + 3D Acrylic Letters",
      "link": "directory-signage.html#wooden_base"
    },
    {
      "name": "SS Plate + SS Cut Letters + Vinyl Cut Letters",
      "link": "directory-signage.html#ss_plate"
    },
    {
      "name": "Aluminum Profile Board + Vinyl Cut Letters",
      "link": "directory-signage.html#aluminum_profile"
    },
    {
      "name": "Wooden + Acrylic with Acrylic & Vinyl Cut Letters",
      "link": "directory-signage.html#wooden_acrylic"
    },
    {
      "name": "Sticker on Forex",
      "link": "directory-signage.html#sticker"
    },
    {
      "name": "Decal on Acrylic",
      "link": "directory-signage.html#acrylic_decals"
    },
    {
      "name": "Self Standing Letters",
      "link": "signage-company-in.html#selfstanding"
    },
    {
      "name": "Metal Letters",
      "link": "metal-letters.html"
    },
    {
      "name": "Steel Letters with Gold Plating",
      "link": "metal-letters.html#steel_gold"
    },
    {
      "name": "SS Brush Finish",
      "link": "metal-letters.html#ss_brush"
    },
    {
      "name": "Aluminum with Powder Coating",
      "link": "metal-letters.html#aluminum_powder"
    },
    {
      "name": "Aluminum + Acrylic Frontlit Letters",
      "link": "metal-letters.html#aluminum_acrylic"
    },
    {
      "name": "Aluminum + Digital Print on Acrylic Front",
      "link": "metal-letters.html#aluminum_digital"
    },
    {
      "name": "Metal with LED Bulb on Front",
      "link": "metal-letters.html#metal_with_led"
    },
    {
      "name": "Wooden Letters",
      "link": "wooden-letters.html"
    },
    {
      "name": "Solid Wooden with PU Paint Finish",
      "link": "wooden-letters.html#solid_wooden"
    },
    {
      "name": "Wooden MDG with Paint Finish",
      "link": "wooden-letters.html#wooden_mdf"
    },
    {
      "name": "Plywood Sheet with Router Cutting",
      "link": "wooden-letters.html#plywood_sheet"
    },
    {
      "name": "Wooden MDF with Digital Printed Vinyl",
      "link": "wooden-letters.html#wooden_mdf_digital"
    },
    {
      "name": "Wooden MDF with Paint Diniah",
      "link": "wooden-letters.html#wooden_mdf_paint"
    },
    {
      "name": "Solid Wooden Letters with LED Bumb",
      "link": "wooden-letters.html#solid_wooden_led"
    },
    {
      "name": "Acrylic Letters",
      "link": "acrylic-letters.html"
    },
    {
      "name": "Colored Acrylic",
      "link": "acrylic-letters.html#colored_acrylic"
    },
    {
      "name": "Transparent Acrylic (Hollow)",
      "link": "acrylic-letters.html#transparent_acrylic"
    },
    {
      "name": "Transparent Acrylic (Solid)",
      "link": "acrylic-letters.html#transparent_acrylic_solid"
    },
    {
      "name": "Acrylic with front and side light",
      "link": "acrylic-letters.html#acrylic_front_light_side"
    },
    {
      "name": "Acrylic with Front Light",
      "link": "acrylic-letters.html#acrylic_front_light"
    },
    {
      "name": "Acrylic with LED Neon",
      "link": "acrylic-letters.html#acrylic_led_neon"
    },
    {
      "name": "Forex / Foam Letters",
      "link": "forex-foam-letters.html"
    },
    {
      "name": "Forex Letters",
      "link": "forex-foam-letters.html#forex"
    },
    {
      "name": "MDF Letters",
      "link": "forex-foam-letters.html#mdf_letters"
    },
    {
      "name": "Colored Forex Sheet with Router Cut",
      "link": "forex-foam-letters.html#colored_forex"
    },
    {
      "name": "Forex Cubes",
      "link": "forex-foam-letters.html#forex_cubes"
    },
    {
      "name": "Forex Letters with Color Vinyl",
      "link": "forex-foam-letters.html#forex_vinyl"
    },
    {
      "name": "Forex Letters for Painting",
      "link": "forex-foam-letters.html#forex_painting"
    },
    {
      "name": "Forex Letters with Paint",
      "link": "forex-foam-letters.html#forex_letters_paint"
    },
    {
      "name": "Name Plate",
      "link": "signage-company-in.html#nameplate"
    },
    {
      "name": "Metal Name Plates",
      "link": "metal-name-plates.html"
    },
    {
      "name": "Aluminum Profile",
      "link": "metal-name-plates.html#aluminum_profile"
    },
    {
      "name": "Aluminum Sliding Panels",
      "link": "metal-name-plates.html#aluminum_sliding"
    },
    {
      "name": "Metal Nameplate – Etched and Colored",
      "link": "metal-name-plates.html#metal_etched"
    },
    {
      "name": "Metal Name Plate with UV Print",
      "link": "metal-name-plates.html#ss_brush_uv"
    },
    {
      "name": "SS Plate + Acrylic",
      "link": "metal-name-plates.html#acrylic_ss_brush"
    },
    {
      "name": "ACP Plate",
      "link": "metal-name-plates.html#acp_plate"
    },
    {
      "name": "Aluminum Name Plate",
      "link": "metal-name-plates.html#aluminum_powder_coated"
    },
    {
      "name": "Acrylic Name Plates",
      "link": "acrylic-name-plates.html"
    },
    {
      "name": "Opaque Acrylic Plate",
      "link": "acrylic-name-plates.html#white_acrylic"
    },

    {
      "name": "Acrylic Plate with Vinyl Cut Letters",
      "link": "acrylic-name-plates.html#acrylic_plate"
    },
    {
      "name": "Acrylic Plate Etching & Colored Letters",
      "link": "acrylic-name-plates.html#acrylic_plate_etching"
    },
    {
      "name": "Layered Acrylic Plates",
      "link": "acrylic-name-plates.html#layered"
    },
    {
      "name": "Acrylic Plate with UV Print",
      "link": "acrylic-name-plates.html#acrylic_plate_uv"
    },
    {
      "name": "Wooden Name Plates",
      "link": "wooden-name-plates.html"
    }, 
    {
      "name": "Wooden Plate with Laser Engraved Letters",
      "link": "wooden-name-plates.html#wooden_plate"
    }, 
    {
      "name": "Wooden Plate with Vinyl Cut Letters",
      "link": "wooden-name-plates.html#wooden_plate_vinyl"
    }, 
    {
      "name": "Wooden Plate with UV Direct Printing",
      "link": "wooden-name-plates.html#wooden_plate_uv_direct"
    }, 
    {
      "name": "Wooden Plate with Acrylic 3D Letters",
      "link": "wooden-name-plates.html#wooden_plate_acrylic"
    }, 
    {
      "name": "Wooden Plate with SS 3D Letters",
      "link": "wooden-name-plates.html#wooden_plate_ss"
    }, 
    {
      "name": "Wooden Plate with UV Direct Printing",
      "link": "wooden-name-plates.html#wooden_plate_uv"
    }, 
    {
      "name": "Wooden Plate + Acrylic Direct UV Printed Plate",
      "link": "wooden-name-plates.html#wooden_plate_acrylic_uv"
    }, 
    {
      "name": "Wooden Plate with Revers Cut Letters",
      "link": "wooden-name-plates.html#wooden_plate_revers"
    }, 
    {
      "name": "Table Top Signage",
      "link": "table-top-plates.html"
    },
    {
      "name": "Acrylic Poster Insert Stands",
      "link": "table-top-plates.html#acrylic_poster"
    },
    {
      "name": "Acrylic Table Top Signage",
      "link": "table-top-plates.html#acrylic_table_top"
    },
    {
      "name": "Wooden Cut 3D Letters with Base",
      "link": "table-top-plates.html#wooden_cut"
    },
    {
      "name": "Molded Plate with Etching & Coloring",
      "link": "table-top-plates.html#ss_molded"
    },
    {
      "name": "Wooden Base Standees",
      "link": "table-top-plates.html#wooden_base"
    },
    {
      "name": "Table Name Plate",
      "link": "table-top-plates.html#ss_brush"
    },
    // {
    //   "name": "Desk Name Plate",
    //   "link": "table-top-plates.html#desk_name_plate"
    // },
    // {
    //   "name": "Acrylic Table Stand",
    //   "link": "table-top-plates.html#acrylic_table_stand"
    // },
    {
      "name": "Wooden Cube",
      "link": "table-top-plates.html#wooden_cube"
    },
    {
      "name": "Table Top Stand",
      "link": "table-top-plates.html#table_top_stand"
    },
    {
      "name": "Safety Signage",
      "link": "signage-company-in.html#safety"
    },
    {
      "name": "Self-Standing Sign",
      "link": "self-standing-sign.html"
    },
    {
      "name": "Metal Stands with Colored Vinyl Letters / Digital Printing",
      "link": "self-standing-sign.html#metal_stands"
    },
    {
      "name": "ACP / SS / PVC Stands with Colored Vinyl Letters",
      "link": "self-standing-sign.html#acp_stands"
    },
    {
      "name": "Stopper / Easy Swap Stand",
      "link": "self-standing-sign.html#stopper_stand"
    },
    {
      "name": "Metal Stand with Poster Inserting",
      "link": "self-standing-sign.html#metal_stand"
    },
    {
      "name": "Wooden Stand with Vinyl Cut Letters / Digital Printing",
      "link": "self-standing-sign.html#wooden_stand"
    },
    {
      "name": "Metal Pipe Stand with Digital Print",
      "link": "self-standing-sign.html#metal_pipe_stand"
    },
    {
      "name": "Wooden Folding Stand with Digital Print",
      "link": "self-standing-sign.html#wooden_folding_stand"
    },
    {
      "name": "Wooden Sheet Clipping Stand with Engraving",
      "link": "self-standing-sign.html#wooden_sheet_clipping"
    },
    {
      "name": "Wooden Bars Stand with Engraving / Color Vinyl Letters",
      "link": "self-standing-sign.html#wooden_bars_stand"
    },
    // {
    //   "name": "Wall Mounted Sign",
    //   "link": "wall-mounted-signage.html"
    // },
    {
      "name": "Floor Sign / Signage",
      "link": "floor-signs-graphics.html"
    },
    {
      "name": "Floor Grade Colored Vinyl with Cutting",
      "link": "floor-signs-graphics.html#floor_grade"
    },
    {
      "name": "Floor Grade Vinyl with Digital Printing",
      "link": "floor-signs-graphics.html#floor_grade_digital"
    },
    {
      "name": "Aluminum L Channels with Reflective Vinyl",
      "link": "floor-signs-graphics.html#aluminum_l_channels"
    },
    {
      "name": "Photo Luminescent Vinyl Print Letters",
      "link": "floor-signs-graphics.html#photo_luminescent"
    },
    {
      "name": "Labels",
      "link": "signage-company-in.html#labels"
    },
    {
      "name": "Traffolyte / PVC / Acrylic Labels",
      "link": "traffolyte-labels.html"
    },
    {
      "name": "Metal Labels",
      "link": "metal-labels.html"
    },
    {
      "name": "Aluminum Label with UV Direct Printing",
      "link": "metal-labels.html#aluminum_label"
    },
    {
      "name": "SS Brush Finish Label with Laser Engraving",
      "link": "metal-labels.html#ss_brush_label"
    },
    {
      "name": "Aluminum Label with heat Transfer Printing",
      "link": "metal-labels.html#aluminum_label_heat"
    },
    {
      "name": "Aluminum Label with Engraving & Coloring",
      "link": "metal-labels.html#aluminum_label_engraving"
    },
    {
      "name": "SS Matt Finish Label with Etching & Coloring",
      "link": "metal-labels.html#ss_matt_label"
    },
    {
      "name": "Metal Label with UV Direct Printing",
      "link": "metal-labels.html#metal_label_uv"
    },
    {
      "name": "Wooden Labels",
      "link": "wooden-labels.html"
    },
    {
      "name": "Plywood Labels with Direct Printing",
      "link": "wooden-labels.html#plywood_labels"
    },
    {
      "name": "Solid Wooden Label with Engraving",
      "link": "wooden-labels.html#solid_wooden_labels"
    },
    {
      "name": "Wooden Sheet Label with Laser Engraving",
      "link": "wooden-labels.html#wooden_sheet_labels"
    },
    {
      "name": "Acrylic Labels",
      "link": "acrylic-labels.html"
    },
    {
      "name": "Silver / Gold / Transparent Labels with Engraving",
      "link": "acrylic-labels.html#silver_gold_labels"
    },
    {
      "name": "Colored Acrylic with Laser Engraved Labels",
      "link": "acrylic-labels.html#colored_acrylic_labels"
    },
    {
      "name": "All Flags",
      "link": "flags-printing-branding.html"
    },
    {
      "name": "Event & Branding Flags",
      "link": "flags-printing-branding.html"
    },
    {
      "name": "Sail Flags",
      "link": "sail_flags.html"
    },
    { 
      "name": "Sail Flag - Compact",
      "link": "sail_flags.html#compact"
    },
    {
      "name": "Tear Drop Flags",
      "link": "tear_drop_flags.html"
    },
    {
      "name": "L Shape Flags",
      "link": "l_shape_flags.html"
    },
    {
      "name": "L Shape - Marker Flags",
      "link": "l_shape_flags.html#marker"
    },
    {
      "name": "Blade Flags",
      "link": "blade_flags.html"
    },
    {
      "name": "Telescopic Flags",
      "link": "telescopic_flags.html"
    },
    {
      "name": "Decorative Flags",
      "link": "flags-printing-branding.html#decoration"
    },
    {
      "name": "Car Flags",
      "link": "car_flags.html"
    },
    {
      "name": "Car Desert Flags",
      "link": "car_desert_flags.html"
    },
    {
      "name": "Off Road Flags",
      "link": "car_desert_flags.html"
    },
    {
      "name": "Buggy Flag",
      "link": "car_desert_flags.html"
    },
    {
      "name": "Dashboard Flags",
      "link": "dashboard_flags.html"
    },
    {
      "name": "Pennant Flags",
      "link": "pennant_flags.html"
    },
    {
      "name": "Bunting Flags",
      "link": "bunting_flags.html"
    },
    {
      "name": "Toothpick Flags",
      "link": "toothpick_flags.html"
    },
    {
      "name": "Event Gear",
      "link": "flags-printing-branding.html#handheld"
    },
    {
      "name": "Pole Flags",
      "link": "hand_waving_flags.html"
    },
    {
      "name": "Hand Flags",
      "link": "hand_held_flags.html"
    },
    {
      "name": "Finish Line Ribbons",
      "link": "finish-line.html"
    },
    {
      "name": "Body Flags",
      "link": "body_flags.html"
    },
    {
      "name": "Fan Scarf",
      "link": "soccer_sport_scarf.html"
    },
    {
      "name": "Outdoor Flags",
      "link": "flags-printing-branding.html#outdoor"
    },
    {
      "name": "Hoisting Flags",
      "link": "hoisting_flags.html"
    },
    {
      "name": "Wall Mounted Flags",
      "link": "wall_mounted_flags.html"
    },
    {
      "name": "Stadium Flags",
      "link": "stadium-flags.html"
    },
    {
      "name": "Advertising Flags",
      "link": "advertising_flags.html"
    },
    {
      "name": "Festival Flags",
      "link": "festival_flags.html"
    },
    {
      "name": "Office Flags",
      "link": "flags-printing-branding.html#office"
    },
    {
      "name": "Table Flags",
      "link": "table_flags.html"
    },
    {
      "name": "Classic Table Flags",
      "link": "table_flags.html#classic"
    },
    {
      "name": "Premium Table Flags",
      "link": "table_flags.html#premium"
    },
    {
      "name": "Stiff Canvas Table Flags",
      "link": "table_flags.html#stiff"
    },
    {
      "name": "L-Shape Table Flags",
      "link": "table_flags.html#l_shape"
    },
    {
      "name": "T-Shape Table Flags",
      "link": "table_flags.html#t_shape"
    },
    {
      "name": "Y-Shape Table Flags",
      "link": "table_flags.html#y_shape"
    },
    {
      "name": "V-Shape Table Flags",
      "link": "table_flags.html#v_shape"
    },
    {
      "name": "Tripole Table Flags",
      "link": "table_flags.html#tripole"
    },
    {
      "name": "Four Pole Table Flag",
      "link": "table_flags.html#four"
    },
    {
      "name": "Table Flags - Royal",
      "link": "table_flags.html#flag_royal"
    },
    {
      "name": "Conference Flags",
      "link": "conference_flags.html"
    },
    {
      "name": "Conference Flags - Hanging",
      "link": "conference_hanging_flags.html"
    },
    {
      "name": "Flag Base",
      "link": "flag-base.html"
    },
    {
      "name": "All Standees and Backdrops",
      "link": "backdrop-stand.html"
    },
    {
      "name": "Popups, Rollups & Banners",
      "link": "backdrop-stand.html"
    },
    {
      "name": "Pop Ups",
      "link": "pop-up-banner.html"
    },
    {
      "name": "Pop Up Softcase (Straight)",
      "link": "pop-up-banner.html"
    },
    {
      "name": "Pop Up Softcase (Curved)",
      "link": "pop-up-banner.html#curved"
    },
    {
      "name": "Pop Up Hardcase (Straight)",
      "link": "pop-up-banner.html#hardcase"
    },
    {
      "name": "Pop Up Hardcase (Curved)",
      "link": "pop-up-banner.html#hardcase-curved"
    },
    {
      "name": "Fabric Pop Ups",
      "link": "fabric-pop-up-printing-in.html"
    },
    {
      "name": "Fabric Pop Up (Curved)",
      "link": "fabric-pop-up-printing-in.html#fabric-popup-curved"
    },
    {
      "name": "Backlit Fabric Pop Up (Straight)",
      "link": "fabric-pop-up-printing-in.html#backlit-fabric-popup"
    },
    {
      "name": "Backlit Fabric Pop Up (Curved)",
      "link": "fabric-pop-up-printing-in.html#backlit-fabric-popup-curved"
    },
    {
      "name": "Rollup Banner",
      "link": "roll-ups-printing.html"
    },
    {
      "name": "X Banners",
      "link": "banners-printing.html#xbanner"
    },
    {
      "name": "Pennant Banner",
      "link": "banners-printing.html#pennant_banner"
    },
    {
      "name": "Hanging Banner",
      "link": "banners-printing.html#hanging_banner"
    },
    {
      "name": "PVC Banner",
      "link": "banners-printing.html"
    },
    {
      "name": "Flex Banner",
      "link": "banners-printing.html"
    },
    {
      "name": "Fabric Hanging Banner",
      "link": "banners-printing.html#fabric_hanging_banner"
    },
    {
      "name": "Fabric Banner",
      "link": "banners-printing.html#fabric_banner"
    },
    {
      "name": "Flex Hanging Banner",
      "link": "banners-printing.html"
    },
    {
      "name": "Banners-flex & fabric",
      "link": "banners-printing.html"
    },
    {
      "name": "Fence Banners - Flex",
      "link": "fence-banner-printing.html"
    },
    {
      "name": "Lama Stand",
      "link": "lama-standee-printing.html"
    },
    {
      "name": "Backlit Standee",
      "link": "backdrop-stand.html#backlit"
    },
    {
      "name": "Snapfold Backlit Standee",
      "link": "snapfold-backlit-standee-printing.html"
    },
    {
      "name": "Classic Backlit Standee",
      "link": "backlit-standee.html"
    },
    {
      "name": "Backdrop & Standees",
      "link": "backdrop-stand.html"
    },
    {
      "name": "Wooden Backdrop",
      "link": "wooden-backdrop-printing-in.html"
    },
    {
      "name": "Wooden Backdrop With Base",
      "link": "wooden-backdrop-printing-in.html#with-base"
    },
    {
      "name": "Mosaic Wall",
      "link": "wooden-backdrop-printing-in.html#mosaic-wall"
    },
    {
      "name": "Outdoor Heavy Duty Backdrop",
      "link": "wooden-backdrop-printing-in.html#heavy-duty"
    },
    // {
    //   "name": "Wooden Self Standee",
    //   "link": "wooden-backdrop-printing-in.html#self-standee"
    // },
    {
      "name": "Multi-Layered Backdrops",
      "link": "wooden-backdrop-printing-in.html#multi-layered"
    },
    {
      "name": "Arch Standee",
      "link": "wooden-backdrop-printing-in.html#arch-standee"
    },
    {
      "name": "Step and Repeat Backdrop - PVC",
      "link": "step-and-repeat-backdrop-printing-in.html"
    },
    {
      "name": "Step and Repeat Backdrop - Fabric",
      "link": "step-and-repeat-backdrop-printing-in.html#fabric"
    },
    {
      "name": "Fabric Backdrop Indoor",
      "link": "fabric-backdrop-printing-in.html"
    },
    {
      "name": "Fabric Standee Seamless",
      "link": "fabric-backdrop-printing-in.html#fabricstandee"
    },
    {
      "name": "Fabric Backdrop Seamless",
      "link": "fabric-backdrop-printing-in.html#fabricbackdrop"
    },
    {
      "name": "Totem Display Stand",
      "link": "lama-standee-printing.html#totem_standee"
    },
    {
      "name": "Forex Self Standee",
      "link": "lama-standee-printing.html#forex_standee"
    },
    {
      "name": "Fabric Backdrop Outdoor",
      "link": "fabric-backdrop-printing-in.html#fabric-backdrop-outdoor"
    },
    {
      "name": "Space Dividers",
      "link": "fabric-backdrop-printing-in.html#space-dividers"
    },
    {
      "name": "LED Screen Rental",
      "link": "led-screen-rental.html"
    },
    {
      "name": "Balloon  Decorators",
      "link": "balloon-decorators.html"
    },
    {
      "name": "Round Fabric Backdrop ",
      "link": "round-backdrop-printing-in.html"
    },
    {
      "name": "Round Corporate backdrop ",
      "link": "round-backdrop-printing-in.html#corporate"
    },
    {
      "name": "Round Party Backdrop ",
      "link": "round-backdrop-printing-in.html#party"
    },
    {
      "name": "Spring A Board / Pop Out Banner",
      "link": "pop-out-banner-printing-in.html"
    },
    {
      "name": "Toblerone Frame",
      "link": "toblerone-a-frame-printing-in.html"
    },
    {
      "name": "Toblerone - Forex",
      "link": "toblerone-a-frame-printing-in.html#forex"
    },
    {
      "name": "Toblerone - Metal",
      "link": "toblerone-a-frame-printing-in.html#metal"
    },
    {
      "name": "Wooden Stand – Foldable",
      "link": "toblerone-a-frame-printing-in.html#wooden_stand"
    },
    {
      "name": "MDF Stand – Portable",
      "link": "toblerone-a-frame-printing-in.html#mdf_stand"
    },
    {
      "name": "Cutout Standee",
      "link": "cutout-standee-printing.html"
    },
    {
      "name": "Product Standee",
      "link": "cutout-standee-printing.html#product_standee"
    },
    {
      "name": "Caricature Cutout Standee",
      "link": "cutout-standee-printing.html#caricature_standee"
    },
    {
      "name": "Forex Board Cutout Standee",
      "link": "cutout-standee-printing.html#forex_standee"
    },
    {
      "name": "ACP Cutout Standee",
      "link": "cutout-standee-printing.html#apc_standee"
    },
    {
      "name": "Wooden Cutout Standee",
      "link": "cutout-standee-printing.html#wooden_standee"
    },
    {
      "name": "Backlit Displays",
      "link": "backdrop-stand.html#backlit"
    },
    {
      "name": "Backlit Backdrop",
      "link": "backlit-backdrop-printing-in.html"
    },
    {
      "name": "Photo Booth",
      "link": "photo-booth.html"
    },
    {
      "name": "Magazine Photo Booth",
      "link": "photo-booth.html"
    },
    {
      "name": "Photo Booth Stage",
      "link": "photo-booth.html#photo_booth_stage"
    },
    {
      "name": "Backlit Arches",
      "link": "backlit-arches.html"
    },
    {
      "name": "Portable Display Standee",
      "link": "backdrop-stand.html#standees"
    },
    {
      "name": "Promotion Table",
      "link": "promotion-table.html"
    },
    {
      "name": "Promotional Kiosk",
      "link": "promotion-table.html"
    },
    {
      "name": "Exhibition Counter",
      "link": "exhibition-counter.html"
    },
    {
      "name": "Fabric Counter Oval",
      "link": "exhibition-counter.html#fabric_counter_oval"
    },
    {
      "name": "Fabric Counter Rectangular",
      "link": "exhibition-counter.html#fabric_counter_rectangular"
    },
    {
      "name": "Fabric Pop Up Counter",
      "link": "exhibition-counter.html#fabric_pop_up_counter"
    },
    {
      "name": "Backlit Exhibition Counter",
      "link": "exhibition-counter.html#backlit_counter"
    },
    {
      "name": "Pop Up Display Counter",
      "link": "exhibition-counter.html#popupcounterdisplay"
    },
    {
      "name": "Hardcase Counter",
      "link": "exhibition-counter.html#hardcase"
    },
    {
      "name": "Tent / Canopy / Gazebo",
      "link": "outdoor-tent-printing.html"
    },
    {
      "name": "Flat Roof Tents",
      "link": "outdoor-tent-printing.html#flat"
    },
    {
      "name": "Outdoor Umbrella",
      "link": "outdoor-umbrella.html"
    },
    {
      "name": "Parasol Umbrella",
      "link": "outdoor-umbrella.html#parasol"
    },
    {
      "name": "Patio Umbrella",
      "link": "outdoor-umbrella.html#patio"
    },
    {
      "name": "Pool Umbrella",
      "link": "outdoor-umbrella.html#pool"
    },
    {
      "name": "Table Cover & Table Cloth",
      "link": "table-cloth-table-cover.html"
    },
    {
      "name": "Table Runner",
      "link": "table-cloth-table-cover.html#types"
    },
    {
      "name": "Table Branding",
      "link": "table-cloth-table-cover.html#table_branding"
    },
    {
      "name": "Fitted Table Cover",
      "link": "table-cloth-table-cover.html#types"
    },
    {
      "name": "Round Table Cloth",
      "link": "table-cloth-table-cover.html#types"
    },
    {
      "name": "Social Media Frame",
      "link": "social_media_hashtag_frame.html"
    },
    {
      "name": "Instagram Frames",
      "link": "social_media_hashtag_frame.html"
    },
    {
      "name": "Life Size Photo Frame",
      "link": "social_media_hashtag_frame.html"
    },
    {
      "name": "Hashtag Cutout",
      "link": "social_media_hashtag_frame.html#hashtag"
    },
    {
      "name": "Giant Cheque",
      "link": "social_media_hashtag_frame.html#giant_cheque"
    },
    {
      "name": "Party Accessories",
      "link": "party-props.html"
    },
    {
      "name": "Marquee Message Board",
      "link": "party-props.html"
    },
    {
      "name": "Custom Face Cutouts",
      "link": "party-props.html#custom_face_cutouts"
    },
    {
      "name": "Party Hats",
      "link": "party-props.html#hats"
    },
    {
      "name": "Wearables & Entry",
      "link": "party-props.html#hats"
    },
    {
      "name": "Party Props ", 
      "link": "party-props.html"
    },
    {
      "name": "Party Essentials ", 
      "link": "party-props.html"
    },
    {
      "name": "Masks",
      "link": "party-props.html"
    },
    {
      "name": "Photo & Decor",
      "link": "party-props.html#frames"
    },
    {
      "name": "Tableware & Drinkware",
      "link": "party-props.html#drinkware"
    },
    {
      "name": "Foam / Forex Boards",
      "link": "foam-board.html"
    },
    {
      "name": "Shell Scheme Booth Branding",
      "link": "exhibition-graphics.html"
    },
    {
      "name": "Exhibition Stand / Shell Scheme Booth",
      "link": "exhibition-graphics.html"
    },
    {
      "name": "Individual Panel Branding",
      "link": "exhibition-graphics.html"
    },
    {
      "name": "Shell Scheme Booth Counters",
      "link": "exhibition-graphics.html#booth_counters"
    },
    {
      "name": "Shell Scheme",
      "link": "backdrop-stand.html#shell_scheme"
    },
    {
      "name": "Island Backlit Shell Scheme",
      "link": "backlit-modular-shell-scheme.html"
    },
    {
      "name": "Modular Backlit Booths",
      "link": "backlit-modular-shell-scheme.html#modular"
    },
    {
      "name": "All Corporate Gift & bags",
      "link": "promotional-corporate-gifts.html"
    },
    {
      "name": "Office Essentials",
      "link": "promotional-corporate-gifts.html"
    },
    {
      "name": "Pens",
      "link": "pens-printing.html"
    },
    {
      "name": "Plastic Pens",
      "link": "pens-printing.html#plastic"
    },
    {
      "name": "Metal Pens",
      "link": "pens-printing.html#metal"
    },
    {
      "name": "Rubberized Pens",
      "link": "pens-printing.html#rubberized"
    },
    {
      "name": "Crystal Pens",
      "link": "pens-printing.html#crytal"
    },
    {
      "name": "Pens with Stylus",
      "link": "pens-printing.html#stylus"
    },
    {
      "name": "Bamboo Pens",
      "link": "pens-printing.html#bamboo"
    },
    {
      "name": "Eco Friendly Pens",
      "link": "pens-printing.html#eco_friendly"
    },
    {
      "name": "PU Notebooks",
      "link": "notebooks-printing.html"
    },
    {
      "name": "Cork Notebook",
      "link": "notebooks-printing.html#cork"
    },
    {
      "name": "Bamboo Notebooks",
      "link": "notebooks-printing.html#bamboo"
    },
    {
      "name": "PU Organizer",
      "link": "pu-organizer.html"
    },
    {
      "name": "Corporate Gift Sets",
      "link": "gift-sets.html"
    },
    {
      "name": "Cork Gift Sets",
      "link": "gift-sets.html#cork"
    },
    {
      "name": "Bamboo Gift Sets",
      "link": "gift-sets.html#bamboo"
    },
    {
      "name": "Mouse Pad",
      "link": "mouse-pad-printing.html"
    },
    {
      "name": "Eco Friendly Mouse Pad",
      "link": "mouse-pad-printing.html#eco_friendly"
    },
    {
      "name": "Round Mouse Pad",
      "link": "mouse-pad-printing.html#round"
    },
    {
      "name": "Rectangular Mouse Pad",
      "link": "mouse-pad-printing.html#rectangular"
    },
    {
      "name": "Gel Wrist Support Mouse Pad",
      "link": "mouse-pad-printing.html#gel_wrist"
    },
    {
      "name": "Apparel",
      "link": "promotional-corporate-gifts.html#apparel"
    },
    {
      "name": "T-Shirts",
      "link": "t-shirts-printing.html"
    },
    {
      "name": "Round Neck T-Shirts",
      "link": "t-shirts-printing.html#round_neck"
    },
    {
      "name": "Polo Neck T-Shirts",
      "link": "t-shirts-printing.html#polo_neck"
    },
    {
      "name": "Types of Collars",
      "link": "jersey-printing.html#collars"
    },
    {
      "name": "Jersey Sets",
      "link": "jersey-printing.html#sets"
    },
    {
      "name": "Sleeve Types",
      "link": "jersey-printing.html#sleeve"
    },
    {
      "name": "Florescent Jersey",
      "link": "jersey-printing.html#florescent"
    },
    {
      "name": "Caps",
      "link": "caps-printing.html"
    },
    {
      "name": "Solid Color Caps",
      "link": "caps-printing.html#solid_color"
    },
    {
      "name": "Trucker Caps",
      "link": "caps-printing.html#trucker"
    },
    {
      "name": "Bucket Caps",
      "link": "caps-printing.html#bucket"
    },
    {
      "name": "Baseball Caps",
      "link": "caps-printing.html#baseball"
    },
    {
      "name": "Flex Fit Caps",
      "link": "caps-printing.html#flex_fit"
    },
    {
      "name": "Sports Caps",
      "link": "caps-printing.html#sports"
    },
    {
      "name": "Safety Vest",
      "link": "safety-vest-jacket-printing.html"
    },
    {
      "name": "Safety Jacket",
      "link": "safety-vest-jacket-printing.html"
    },
    {
      "name": "Embroidery Patches",
      "link": "embroidered-patches.html"
    },
    {
      "name": "Silicone Labels",
      "link": "embroidered-patches.html#silicone_patches"
    },
    {
      "name": "Wristbands",
      "link": "wristband-printing.html"
    },
    {
      "name": "Tyvek Wristbands",
      "link": "wristband-printing.html"
    },
    {
      "name": "Fabric Wristband",
      "link": "wristband-printing.html#fabric"
    },
    {
      "name": "Silicone Wristband",
      "link": "wristband-printing.html#silicone"
    },
    {
      "name": "Vinyl Waterproof Wristband",
      "link": "wristband-printing.html#vinyl"
    },
    {
      "name": "Name Badges",
      "link": "name-badges.html"
    },
    {
      "name": "Crystal Trophies",
      "link": "trophies-and-plaques.html"
    },
    {
      "name": "Plaques",
      "link": "trophies-and-plaques.html#plaques"
    },
    {
      "name": "Medals",
      "link": "medals.html"
    },
    {
      "name": "Button Badges",
      "link": "name-badges.html#button_badges"
    },
    {
      "name": "Corporate Name Badge",
      "link": "name-badges.html#corporate_name_badge"
    },
    {
      "name": "Dome Badges",
      "link": "name-badges.html#dome_badges"
    },
    {
      "name": "Event badges",
      "link": "name-badges.html#event_badges"
    },
    {
      "name": "Metal Name badges",
      "link": "name-badges.html#metal_name_badges"
    },
    {
      "name": "Window Name badges",
      "link": "name-badges.html#window_name_badges"
    },
    {
      "name": "Reusable Metal Badges",
      "link": "name-badges.html#reusable_metal_badges"
    },
    {
      "name": "Reusable Name badges",
      "link": "name-badges.html#reusable_name_badges"
    },
    {
      "name": "Lens Cover Name Badges",
      "link": "name-badges.html#lens_cover_name_badges"
    },
    {
      "name": "Lapel Pins",
      "link": "custom-lapel-pins.html"
    },
    {
      "name": "Die Cast Pin",
      "link": "custom-lapel-pins.html#die_cast_pin"
    },
    {
      "name": "Challenge Coins",
      "link": "challenge-coins.html"
    },
    {
      "name": "Acrylic Coins & Tokens",
      "link": "challenge-coins.html#acrylic_coins"
    },
    {
      "name": "Plywood Coins",
      "link": "challenge-coins.html#plywood_coins"
    },
    {
      "name": "Lanyards",
      "link": "lanyard-printing.html"
    },
    {
      "name": "ID Cards & Badge Reel",
      "link": "id-cards.html"
    },
    {
      "name": "Identity Cards",
      "link": "id-cards.html#identity"
    },
    {
      "name": "Premium Cards",
      "link": "id-cards.html#premium"
    },
    {
      "name": "Membership Cards",
      "link": "id-cards.html#membership"
    },
    {
      "name": "Card Holders",
      "link": "id-cards.html#card_holders"
    },
    {
      "name": "Rectractable Badge Reel",
      "link": "id-cards.html#badge_reel"
    },
    {
      "name": "Keychain",
      "link": "keychain-printing.html"
    },
    {
      "name": "Bamboo/Cork Keychain",
      "link": "keychain-printing.html#bamboo_cork"
    },
    {
      "name": "Leather Keychain",
      "link": "keychain-printing.html#leather"
    },
    {
      "name": "Acrylic Keychain",
      "link": "keychain-printing.html#acrylic_keychain"
    },
    {
      "name": "Acrylic Keychain - Customized",
      "link": "keychain-printing.html#custom_keychains"
    },
    {
      "name": "Embroidered Keychain",
      "link": "keychain-printing.html#embroidery"
    },
    {
      "name": "Metal Keychain",
      "link": "keychain-printing.html#metal"
    },
    {
      "name": "Metal Keychain - Customized",
      "link": "keychain-printing.html#customized"
    },
    {
      "name": "Rubber Keychain ",
      "link": "keychain-printing.html#rubber"
    },
    {
      "name": "USB",
      "link": "usb-printing.html"
    },
    {
      "name": "Crystal USB",
      "link": "crystal-usb-printing.html"
    },
    {
      "name": "Corporate Card USB",
      "link": "corporate-card-usb-printing.html"
    },
    {
      "name": "Premium Silver Card USB",
      "link": "silver-card-usb-printing.html"
    },
    {
      "name": "Twister USB",
      "link": "twister-usb-printing.html"
    },
    {
      "name": "Wooden USB",
      "link": "wooden-usb-printing.html"
    },
    {
      "name": "3D USB",
      "link": "3d-usb.html"
    },
    {
      "name": "Metal USB",
      "link": "metal-usb-printing.html"
    },
    {
      "name": "Round USB",
      "link": "round-usb-printing.html"
    },
    {
      "name": "Pen USB",
      "link": "pen-usb-printing.html"
    },
    {
      "name": "Metal Clip USB",
      "link": "metal-clip-usb-printing.html"
    },
    {
      "name": "Drinkware",
      "link": "promotional-corporate-gifts.html#drinkware"
    },
    {
      "name": "Mugs",
      "link": "mugs-printing.html"
    },
    {
      "name": "Mugs Designing & Printing",
      "link": "mugs-printing.html"
    },
    {
      "name": "Solid Mugs - Glossy",
      "link": "mugs-printing.html#glossy"
    },
    {
      "name": "Solid Mugs - Matt",
      "link": "mugs-printing.html#matt"
    },
    {
      "name": "Half Coloured Mugs",
      "link": "mugs-printing.html#half"
    },
    {
      "name": "Flashy Mugs",
      "link": "mugs-printing.html#flashy"
    },
    {
      "name": "Cork Mug",
      "link": "mugs-printing.html#cork"
    },
    {
      "name": "Glass Mug",
      "link": "mugs-printing.html#glass"
    },
    {
      "name": "Magic Mug",
      "link": "mugs-printing.html#magic"
    },
    {
      "name": "Bottles",
      "link": "bottles-printing.html"
    },
    {
      "name": "Bottle Branding",
      "link": "bottles-printing.html#branding"
    },
    {
      "name": "Mist Bottles",
      "link": "bottles-printing.html#mist"
    },
    {
      "name": "Fern Bottles",
      "link": "bottles-printing.html#fern"
    },
    {
      "name": "Dew Bottles",
      "link": "bottles-printing.html#dew"
    },
    {
      "name": "Evergreen Bottles",
      "link": "bottles-printing.html#evergreen"
    },
    {
      "name": "Cooper Bamboo Bottles",
      "link": "bottles-printing.html#cooper_bamboo"
    },
    {
      "name": "Sports Bottles",
      "link": "bottles-printing.html#sports"
    },
    {
      "name": "Valley Bottles",
      "link": "bottles-printing.html#valley"
    },
    {
      "name": "Serene Bottles",
      "link": "bottles-printing.html#Serene"
    },
    {
      "name": "Cooper Soft Touch Bottles",
      "link": "bottles-printing.html#cooper_soft_touch"
    },
    {
      "name": "Cooper Silver Bottles",
      "link": "bottles-printing.html#cooper_silver"
    },
    {
      "name": "Cooper Black Bottles",
      "link": "bottles-printing.html#cooper_black"
    },
    {
      "name": "Cooper White Bottle",
      "link": "bottles-printing.html#cooper_white"
    },
    {
      "name": "Flow Bottle",
      "link": "bottles-printing.html#flow"
    },
    {
      "name": "Stream Bottle",
      "link": "bottles-printing.html#stream"
    },
    {
      "name": "Aquatic Bottle",
      "link": "bottles-printing.html#aquatic"
    },
    {
      "name": "Lagoon Bottle",
      "link": "bottles-printing.html#lagoon"
    },
    {
      "name": "Brook Bottle",
      "link": "bottles-printing.html#brook"
    },
    {
      "name": "Glass Bottles",
      "link": "bottles-printing.html#glass"
    },
    {
      "name": "Timber Bottles",
      "link": "bottles-printing.html#timber"
    },
    {
      "name": "Jute Flow Bottles",
      "link": "bottles-printing.html#jute_flow"
    },
    {
      "name": "Aqua Bottles",
      "link": "bottles-printing.html#aqua"
    },
    {
      "name": "Rain Bottles",
      "link": "bottles-printing.html#rain"
    },
    {
      "name": "Pal Bottles",
      "link": "bottles-printing.html#pal"
    },
    {
      "name": "Buddy Bottles",
      "link": "bottles-printing.html#buddy"
    },
    {
      "name": "Mate Bottles",
      "link": "bottles-printing.html#mate"
    },
    {
      "name": "Pacific Bottles",
      "link": "bottles-printing.html#pacific"
    },
    {
      "name": "Sports Bottles",
      "link": "bottles-printing.html#sports"
    },
    // {
    //   "name": "Infuser Bottles",
    //   "link": "bottles-printing.html#infuser"
    // },
    {
      "name": "Tumblers",
      "link": "tumblers-printing.html"
    },
    {
      "name": "Forest Tumblers",
      "link": "tumblers-printing.html#forest"
    },
    {
      "name": "Verdant Tumblers",
      "link": "tumblers-printing.html#verdant"
    },
    {
      "name": "Pace Tumblers",
      "link": "tumblers-printing.html#pace"
    },
    {
      "name": "Whirl Tumblers",
      "link": "tumblers-printing.html#whirl"
    },
    {
      "name": "Cork Tumbler ",
      "link": "tumblers-printing.html#cork_handle"
    },
    { 
      "name": "Flip Tumbler",
      "link": "tumblers-printing.html#flip"
    },
    {
      "name": "Drift Tumbler",
      "link": "tumblers-printing.html#drift"
    },
    {
      "name": "Toss Tumbler",
      "link": "tumblers-printing.html#toss"
    },
    {
      "name": "Travel Tumblers",
      "link": "tumblers-printing.html#travel_tumbler"
    },
    {
      "name": "Shopping / Promotional Bags",
      "link": "bags-printing.html"
    },
    {
      "name": "Paper Bags",
      "link": "paper-bags-printing.html"
    },
    {
      "name": "Kraft Bags",
      "link": "kraft-bags-printing.html"
    },
    {
      "name": "Non Woven Bags",
      "link": "non-woven-bags-printing.html"
    },
    {
      "name": "Jute Bags",
      "link": "jute-bags-printing.html"
    },
    {
      "name": "Tote Bags",
      "link": "tote-bags-printing.html"
    },
    {
      "name": "Canvas Bags - Readymade",
      "link": "tote-bags-printing.html#canvas"
    },
    {
      "name": "Customized Canvas Bags",
      "link": "tote-bags-printing.html#custom_canvas"
    },
    {
      "name": "Drawstring Bags",
      "link": "string-bags-printing.html"
    },
    {
      "name": "Cotton String Bags",
      "link": "string-bags-printing.html#cottonbags"
    },
    {
      "name": "Cotton bag with jute base",
      "link": "string-bags-printing.html#cotton_jute"
    },
    {
      "name": "Neck Tie",
      "link": "tie-printing.html"
    },
    {
      "name": "Tie Clips",
      "link": "tie-printing.html#clips"
    },
    {
      "name": "Personalized Tie",
      "link": "tie-printing.html"
    },
    {
      "name": "Cufflink",
      "link": "cufflinks.html"
    },
    {
      "name": "Coaster",
      "link": "drink-coasters-printing.html"
    },
    {
      "name": "Cork Coasters",
      "link": "drink-coasters-printing.html#cork"
    },
    {
      "name": "Bamboo Coasters",
      "link": "drink-coasters-printing.html#bamboo"
    },
    {
      "name": "Hardboard Coasters",
      "link": "drink-coasters-printing.html#hardboard"
    },
    {
      "name": "Silicone Coasters",
      "link": "drink-coasters-printing.html#silicone"
    },
    {
      "name": "Napkin",
      "link": "napkins.html"
    },
    {
      "name": "Paper Napkin",
      "link": "napkins.html"
    },
    {
      "name": "Paper Cups",
      "link": "paper-cup.html"
    },
  {
      "name": "Kraft Paper Cup",
      "link": "paper-cup.html#kraft"
    },
    {
      "name": "Ice Cream Cup",
      "link": "paper-cup.html#ice_creame_cup"
    },
    {
      "name": "Water Bottle Label",
      "link": "water-bottle-label.html"
    },
    {
      "name": "Event Disposables",
      "link": "promotional-corporate-gifts.html#disposables"
    },
    {
      "name": "Coffee Stencil",
      "link": "coffee-stencil.html"
    },
    {
      "name": "Polycarbonate Coffee Stencil",
      "link": "coffee-stencil.html#polycarbonate"
    },
    {
      "name": "Acrylic Coffee Stencil",
      "link": "coffee-stencil.html#acrylic"
    },
    {
      "name": "Metal Coffee Stencil",
      "link": "coffee-stencil.html#metal"
    },
    {
      "name": "Table Top Rollup Banner",
      "link": "roll-ups-printing.html#rollup01"
    },
    {
      "name": "Tech Products",
      "link": "promotional-corporate-gifts.html#tech_products"
    },
    {
      "name": "Executive Kit",
      "link": "promotional-corporate-gifts.html#kit"
    },
    {
      "name": "Wireless Power Banks",
      "link": "custom-power-banks.html"
    },
    {
      "name": "Eco-Friendly Power Banks",
      "link": "custom-power-banks.html#eco_friendly"
    },
    {
      "name": "Bluetooth Speakers",
      "link": "custom-bluetooth-speakers.html"
    },
    {
      "name": "Charging Cables",
      "link": "custom-charging-cables.html"
    },

    // sub-products

];

const removedProductLinkPatterns = [
  "abaya-fashion.html",
  "all-fabrics-printing.html",
  "bag-scarf-fashion.html",
  "bandana-fashion.html",
  "beach-shorts-fashion.html",
  "beach-towels.html",
  "blanket-soft-furnish.html",
  "curtains.html",
  "custom-beach-towel-printing.html",
  "custom-face-mask.html",
  "dining-apron.html",
  "dining-table-cloth.html",
  "dining-table-placemat.html",
  "draw-string-pouches.html",
  "fabric-and-fashion-printing.html",
  "fabric-printing-services.html",
  "fashion-wear.html",
  "hair-scarf-printing.html",
  "pocket-handkerchief-fashion.html",
  "sarong-fashion.html",
  "sash-fashion.html",
  "scarf-fashion.html",
  "scrunchies-fashion.html",
  "sheila-fashion.html",
  "soft-furnish-bean-bag.html",
  "soft-furnish-pillow-cushion-printing.html",
  "soccer_sport_scarf.html",
  "table-mat.html",
  "table-napkin.html",
  "textile-roll-printing.html",
  "tie-printing.html",
  "vehicle-branding.html",
  "wall-graphics.html",
  "wall-vinyl-lettering.html",
  "wallpaper-printing.html",
  "embroidered-patches.html",
  "jersey-printing.html",
  "magnetic-sheet-printing.html#silicone-magnet",
  "table-cloth-table-cover.html",
  "table-top-plates.html",
  "promotion-table.html",
  "pos-display-stand.html",
  "pop-up-banner.html#softcase-straight",
  "pop-up-banner.html#hardcase",
  "pop-out-banner-printing-in.html",
  "flags-printing-branding.html",
  "advertising_flags.html",
  "blade_flags.html",
  "body_flags.html",
  "bunting_flags.html",
  "car_desert_flags.html",
  "car_flags.html",
  "conference_flags.html",
  "conference_hanging_flags.html",
  "dashboard_flags.html",
  "festival_flags.html",
  "hand_held_flags.html",
  "hand_waving_flags.html",
  "hoisting_flags.html",
  "l_shape_flags.html",
  "pennant_flags.html",
  "sail_flags.html",
  "stadium-flags.html",
  "table-conference-flags.html",
  "table_flags.html",
  "tear_drop_flags.html",
  "telescopic_flags.html",
  "toothpick_flags.html",
  "wall_mounted_flags.html",
  "frosted-glass-sticker.html",
  "one-way-vision-sticker.html",
  "neon-sign-board.html",
  "metal-name-plates.html",
  "custom-lapel-pins.html",
  "lama-standee-printing.html",
  "cutout-standee-printing.html",
  "social_media_hashtag_frame.html",
  "party-props.html",
  "party-props-templates.html",
  "acrylic-frames-printing.html",
  "what-makes-frosted-glass-stickers-the-best-option.html",
  "optimizing-retail-spaces-with-product-display-stands.html"
];

function normalizeProductLink(link) {
  return String(link || "")
    .trim()
    .replace(/^https?:\/\/(?:www\.)?idealprinters\.pk\//i, "")
    .replace(/^\.?\//, "")
    .replace(/&amp;/g, "&");
}

function isRemovedProductLink(link) {
  const normalized = normalizeProductLink(link);

  return removedProductLinkPatterns.some(function(pattern) {
    if (pattern.indexOf("#") !== -1) {
      return normalized === pattern;
    }

    return normalized === pattern || normalized.startsWith(pattern + "#") || normalized.startsWith(pattern + "?");
  });
}

results = results.filter(function(item) {
  return !isRemovedProductLink(item.link);
});

var options = {
	shouldSort: true,
	matchAllTokens: true,
	findAllMatches: true,
	threshold: 0.4,
	location: 0,
	distance: 100,
	maxPatternLength: 32,
	minMatchCharLength: 1,
	keys: [ "name","link"]
};


var fuse = null;
if (typeof Fuse !== 'undefined') {
  fuse = new Fuse(results, options);
}

function findMatches(wordToMatch, results) {
  return results.filter(response => {
    const regex = new RegExp(wordToMatch, 'gi');
    return response.name.match(regex)
  });
  
}

function normalizeFuseMatches(matches) {
  if (!Array.isArray(matches)) {
    return [];
  }

  return matches.map(match => (match && match.item ? match.item : match));
}

function normalizeSearchText(text) {
  return String(text || '').toLowerCase().trim();
}

function getQueryTokens(query) {
  return normalizeSearchText(query).split(/\s+/).filter(Boolean);
}

function mergeUniqueMatches() {
  const merged = [];
  const seen = new Set();

  Array.from(arguments).forEach(function(matchGroup) {
    (matchGroup || []).forEach(function(item) {
      if (!item || !item.link || seen.has(item.link)) {
        return;
      }

      seen.add(item.link);
      merged.push(item);
    });
  });

  return merged;
}

function scoreResultMatch(item, query) {
  const normalizedName = normalizeSearchText(item.name);
  const normalizedQuery = normalizeSearchText(query);
  const queryTokens = getQueryTokens(query);

  if (!normalizedQuery || !queryTokens.length) {
    return 0;
  }

  let score = 0;

  if (normalizedName === normalizedQuery) {
    score += 200;
  }

  if (normalizedName.startsWith(normalizedQuery)) {
    score += 120;
  }

  if (normalizedName.includes(normalizedQuery)) {
    score += 100;
  }

  const matchedTokens = queryTokens.filter(function(token) {
    return normalizedName.includes(token);
  });

  score += matchedTokens.length * 30;

  if (matchedTokens.length === queryTokens.length) {
    score += 60;
  }

  if (matchedTokens.length > 0) {
    const firstTokenIndex = normalizedName.indexOf(queryTokens[0]);
    if (firstTokenIndex === 0) {
      score += 25;
    }
  }

  return score;
}

function sortMatchesByRelevance(matches, query) {
  return matches.slice().sort(function(a, b) {
    const scoreDifference = scoreResultMatch(b, query) - scoreResultMatch(a, query);
    if (scoreDifference !== 0) {
      return scoreDifference;
    }

    return a.name.length - b.name.length;
  });
}

function getMatchesForQuery(query) {
  const text = query ? String(query).trim() : '';
  if (!text) {
    return [];
  }

  const scoredMatches = results.filter(function(item) {
    return scoreResultMatch(item, text) > 0;
  });

  const rankedMatches = sortMatchesByRelevance(scoredMatches, text);

  if (rankedMatches.length > 0) {
    return rankedMatches;
  }

  let fuseMatches = [];
  if (typeof Fuse !== 'undefined' && fuse && typeof fuse.search === 'function') {
    fuseMatches = normalizeFuseMatches(fuse.search(text));
  }

  return mergeUniqueMatches(fuseMatches, findMatches(text, results));
}

function escapeRegExp(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightMatch(text, query) {
  const normalizedQuery = query ? String(query).trim() : '';
  if (!normalizedQuery) {
    return text;
  }

  const matcher = new RegExp('(' + escapeRegExp(normalizedQuery) + ')', 'ig');
  return String(text).replace(matcher, '<span class="search__term-highlight">$1</span>');
}

function renderSearchResults(resultNode, query) {
  if (!resultNode) {
    return;
  }

  const matchArray = getMatchesForQuery(query).slice(0, 8);

  if (!query || !String(query).trim()) {
    resultNode.style.display = 'none';
    resultNode.innerHTML = '';
    return;
  }

  resultNode.style.display = 'block';

  if (matchArray.length === 0) {
    resultNode.innerHTML = '<div class="search__empty-state">No matching pages found</div>';
    return;
  }

  const html = matchArray.map(function(response) {
    return `
      <a class="search__suggestion" href="${response.link}">${highlightMatch(response.name, query)}</a>
    `;
  }).join('');

  resultNode.innerHTML = html;
}

function displayMatches() {
  const query = searchInput ? searchInput.value : '';
  renderSearchResults(searchResults, query);
}

const searchInput = search ? search.querySelector('input[name="search"]') : null;
const searchResults = search ? search.querySelector('.search__results') : null;


  //allows user to key through results with up and down arrows
if (searchInput && searchResults) {
  searchInput.addEventListener('keyup', (e) => {
    // console.log(e)

    // if (e.keyCode === 13) {
    //   e.preventDefault();
    // }



    if (![38, 40, 13].includes(e.keyCode)) {
      return;
    }

    
    const activeClass = 'search__suggestion--active';
    const current = search.querySelector(`.${activeClass}`);
    const items = search.querySelectorAll('.search__suggestion');
    let next;

    if (e.keyCode === 40 && current) {
      next = current.nextElementSibling || items[0];
    } else if (e.keyCode === 40) {
      next = items[0];
    } else if (e.keyCode === 38 && current) {
      next = current.previousElementSibling || items[items.length - 1]
    } else if (e.keyCode === 38) {
      next = items[items.length - 1];
    }
    // else if (e.keyCode === 13 && current.href) {
    //   window.location = current.href;
    //   return;
    // }
    else if (e.keyCode === 13) {
      if (current && current.href) {
        window.location = current.href; // open selected result
      } else {
        const firstResult = search.querySelector('.search__suggestion');
        if (firstResult && firstResult.href) {
          window.location = firstResult.href; // open first result
        }
      }
      return;
    }


    if (current) {
      current.classList.remove(activeClass);
    }
    next.classList.add(activeClass);
  });

  searchInput.addEventListener('input', displayMatches, (e) => {
    // console.log(e)
    if ([38, 40, 13,114].includes(e.keyCode)) {
      return;
    }
  });

  searchInput.addEventListener('focus', displayMatches);
}

// mobile search bar


//Use arrow up/down to go through choices
const search1 = navbarSearchRoot.querySelector('.searchBar1');

function displayMatches1() {
  const query = searchInput1 ? searchInput1.value : '';
  renderSearchResults(searchResults1, query);
}

const searchInput1 = search1 ? search1.querySelector('input[name="search1"]') : null;
const searchResults1 = search1 ? search1.querySelector('.search__results1') : null;
  //allows user to key through results with up and down arrows
if (searchInput1 && searchResults1) {
  searchInput1.addEventListener('keyup', (e) => {
 
    if (![38, 40, 13].includes(e.keyCode)) {
      return;
    }

    const activeClass = 'search__suggestion--active';
    const current = search1.querySelector(`.${activeClass}`);
    const items = search1.querySelectorAll('.search__suggestion');
    let next;

    if (e.keyCode === 40 && current) {
      next = current.nextElementSibling || items[0];
    } else if (e.keyCode === 40) {
      next = items[0];
    } else if (e.keyCode === 38 && current) {
      next = current.previousElementSibling || items[items.length - 1]
    } else if (e.keyCode === 38) {
      next = items[items.length - 1];
    }
    else if (e.keyCode === 13) {
      if (current && current.href) {
        window.location = current.href;
      } else {
        const firstResult = search1.querySelector('.search__suggestion');
        if (firstResult && firstResult.href) {
          window.location = firstResult.href;
        }
      }
      return;
    }

    if (current) {
      current.classList.remove(activeClass);
    }
    next.classList.add(activeClass);
  });

  searchInput1.addEventListener('input', displayMatches1, (e) => {
    // console.log(e)
    if ([38, 40, 13].includes(e.keyCode)) {
      return;
    }
  });

  searchInput1.addEventListener('focus', displayMatches1);
}

window.addEventListener('click',function(event){
  // console.log(event.target.classList[0] === "search__suggestion")
  if(event.target.classList[0] !== "search__suggestion"){
      // console.log(event.target.classList)
    let searchright = navbarSearchRoot.querySelectorAll('.search__input');
    searchright.forEach((e)=>{
      e.value=""
    })
    if (searchInput1 && searchResults1) {
      displayMatches1()
    }
    if (searchInput && searchResults) {
      displayMatches()
    }
  }
});

// let search__suggestion = document.querySelectorAll("search__suggestion")






var button = document.getElementsByClassName('mobile-nav-btn'),
    tabContent = document.getElementsByClassName('nav-tab-content');
if (button.length > 0 && tabContent.length > 0) {
    button[0].classList.add('active');
    tabContent[0].style.display = 'block';
}


function navbarTabs(e, navbarTabs) {
    var i;
    // console.log(e)
    for (i = 0; i < button.length; i++) {
        tabContent[i].style.display = 'none';
        button[i].classList.remove('active');
    }
    var targetTab = document.getElementById(navbarTabs);
    if (targetTab) {
      targetTab.style.display = 'block';
    }
    e.currentTarget.classList.add('active');
}

function setCategoryBackground(selector) {
  const category = document.querySelector(selector);
  if (category) {
    category.style.background = 'lightgrey';
  }
}



// let current_page = document.querySelectorAll(".breadcrumb-item")
// console.log(current_page[1])
// if(current_page[1] === "Fabric & Fashion")



// Get the third list item (index 2) which contains the "Corporate Gifts & Bags" text
var current_page = document.querySelectorAll('.breadcrumb-item')[1] ;

// Get the text content of the "Corporate Gifts & Bags" element
// console.log(current_page)
var breadcrumb = ""

if(current_page !== undefined){
 breadcrumb = current_page.textContent.trim() ;

}

// Log the retrieved text to the console
if(breadcrumb === "Print & Marketing"){
  
  if(window.innerWidth <= 820){
    for (i = 0; i < button.length; i++) {
        tabContent[i].style.display = 'none';
        button[i].classList.remove('active');
    }
    button[0].classList.add('active');
    tabContent[0].style.display = 'block';

  }
  else{
    setCategoryBackground('.printMarketing');
  

  }
  
}




else if(breadcrumb === "Fabric & Fashion" || breadcrumb === "Fashion & Textile"){

   
  if(window.innerWidth <= 820){
    for (i = 0; i < button.length; i++) {
        tabContent[i].style.display = 'none';
        button[i].classList.remove('active');
    }
    button[1].classList.add('active');
    tabContent[1].style.display = 'block';

  }
  else{
    setCategoryBackground('.fabricFashion');

  }
}

else if(breadcrumb === "Office & Store Branding"){
  setCategoryBackground('.officeStore');

   
  if(window.innerWidth <= 820){
        for (i = 0; i < button.length; i++) {
            tabContent[i].style.display = 'none';
            button[i].classList.remove('active');
        }
         button[2].classList.add('active');
         tabContent[2].style.display = 'block';

      }
     else{
         setCategoryBackground('.officeStore');
     }

  }

else if(breadcrumb === "Signages"){
  
  if(window.innerWidth <= 820){
    for (i = 0; i < button.length; i++) {
        tabContent[i].style.display = 'none';
        button[i].classList.remove('active');
    }
    button[3].classList.add('active');
    tabContent[3].style.display = 'block';

  }
  else{
    setCategoryBackground('.signage');

  }

}
else if(breadcrumb === "Flags" || breadcrumb === "All Flags"){

  if(window.innerWidth <= 820){
    for (i = 0; i < button.length; i++) {
        tabContent[i].style.display = 'none';
        button[i].classList.remove('active');
    }
    button[4].classList.add('active');
    tabContent[4].style.display = 'block';
  }
  else{
    setCategoryBackground('.flags');
  }

}
else if(breadcrumb === "Backdrop and Standees" || breadcrumb === "Backdrops & Exhibition"){

  if(window.innerWidth <= 820){
    for (i = 0; i < button.length; i++) {
        tabContent[i].style.display = 'none';
        button[i].classList.remove('active');
    }
    button[5].classList.add('active');
    tabContent[5].style.display = 'block';
  }
  else{
    setCategoryBackground('.backdropExhibition');
  
  }

}
else if(breadcrumb === "Corporate Gifts & Bags"){

  if(window.innerWidth <= 820){
    for (i = 0; i < button.length; i++) {
        tabContent[i].style.display = 'none';
        button[i].classList.remove('active');
    }
    button[6].classList.add('active');
    tabContent[6].style.display = 'block';
  }
  else{
    setCategoryBackground('.corporateGift');
  
  }

}




document.addEventListener('click', function (event) {
  const mobileBtn = event.target.closest('.searchBar1 .btn-template-main');
  if (mobileBtn) {
    event.preventDefault();
    mobileSearch(mobileBtn);
  }

  const desktopBtn = event.target.closest('.searchBar .btn-template-main');
  if (desktopBtn) {
    event.preventDefault();
    desktopSearch(desktopBtn);
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && event.target && event.target.id === 'desktop-searchbar-focus') {
    event.preventDefault();
    desktopSearch(event.target);
  }

  if (event.key === 'Enter' && event.target && event.target.id === 'mobile-searchbar-focus') {
    event.preventDefault();
    mobileSearch(event.target);
  }
});

function navigateToFirstSearchMatch(query) {
  const matchArray = getMatchesForQuery(query);
  if (matchArray.length > 0 && matchArray[0].link) {
    window.location.href = matchArray[0].link;
  }
}

function desktopSearch(sourceElement){
  let desktopInput = null;

  if (sourceElement && sourceElement.tagName === 'INPUT') {
    desktopInput = sourceElement;
  } else if (sourceElement && sourceElement.closest) {
    const searchContainer = sourceElement.closest('.searchBar');
    if (searchContainer) {
      desktopInput = searchContainer.querySelector('input[name="search"]');
    }
  }

  if (!desktopInput) {
    desktopInput = navbarSearchRoot.querySelector('.searchBar input[name="search"]') || navbarSearchRoot.querySelector('#desktop-searchbar-focus');
  }

  if (!desktopInput) {
    return;
  }

  desktopInput.focus();
  const query = desktopInput.value ? desktopInput.value.trim() : '';
  if (!query) {
    return;
  }

  navigateToFirstSearchMatch(query);
}

function mobileSearch(sourceElement) {
  let mobileInput = null;

  if (sourceElement && sourceElement.tagName === 'INPUT') {
    mobileInput = sourceElement;
  } else if (sourceElement && sourceElement.closest) {
    const searchContainer = sourceElement.closest('.searchBar1');
    if (searchContainer) {
      mobileInput = searchContainer.querySelector('input[name="search1"]');
    }
  }

  if (!mobileInput) {
    mobileInput = navbarSearchRoot.querySelector('.searchBar1 input[name="search1"]') || navbarSearchRoot.querySelector('#mobile-searchbar-focus');
  }

  if (!mobileInput) {
    return;
  }

  mobileInput.focus();
  const query = mobileInput.value ? mobileInput.value.trim() : '';
  if (!query) {
    return;
  }

  navigateToFirstSearchMatch(query);
}

function removeProductDisplayUnit(anchor) {
  if (!anchor) {
    return;
  }

  const displayUnit = anchor.closest(
    "li.nav-item, .catagory-product, .swiper-slide, .item, .col-lg-6, .col-lg-4, .col-lg-3, .col-md-6, .col-md-4, .col-md-3, .col-sm-6, .col-sm-4, .col-6"
  );

  if (displayUnit) {
    displayUnit.remove();
    return;
  }

  anchor.remove();
}

function convertFabricCategoryToWovenLabels() {
  document.querySelectorAll("a.fabricFashion").forEach(function(anchor) {
    anchor.textContent = "Woven Labels";
    anchor.setAttribute("href", "woven-labels.html");
    anchor.classList.remove("dropdown-toggle");
    anchor.removeAttribute("data-bs-toggle");
    anchor.removeAttribute("aria-expanded");

    const navItem = anchor.closest("li.nav-item");
    if (navItem) {
      navItem.classList.remove("dropdown");
      const dropdownMenu = navItem.querySelector(":scope > .dropdown-menu");
      if (dropdownMenu) {
        dropdownMenu.remove();
      }
    }
  });
}

function pruneRemovedProductsFromSite() {
  convertFabricCategoryToWovenLabels();

  document.querySelectorAll("a[href]").forEach(function(anchor) {
    if (isRemovedProductLink(anchor.getAttribute("href"))) {
      removeProductDisplayUnit(anchor);
    }
  });
}

function consolidateInquiryModal() {
  var modals = document.querySelectorAll("#exampleModal");
  if (!modals.length) {
    return null;
  }

  var modal = modals[0];
  for (var i = 1; i < modals.length; i += 1) {
    modals[i].parentNode.removeChild(modals[i]);
  }

  if (modal.parentNode !== document.body) {
    document.body.appendChild(modal);
  }

  return modal;
}

function clearBootstrapModalState() {
  document.querySelectorAll(".modal-backdrop").forEach(function (el) {
    el.parentNode.removeChild(el);
  });
  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("padding-right");

  var modal = document.getElementById("exampleModal");
  if (modal && window.bootstrap && window.bootstrap.Modal) {
    var instance = window.bootstrap.Modal.getInstance(modal);
    if (instance) {
      instance.dispose();
    }
  }
}

function ensureInquiryBackdrop() {
  var backdrop = document.getElementById("ip-inquiry-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.id = "ip-inquiry-backdrop";
    backdrop.className = "ip-inquiry-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(backdrop);
  }
  return backdrop;
}

function wireInquiryButtons(root) {
  var scope = root || document;
  scope.querySelectorAll('.inquiry-btn, [data-ip-inquiry-open], [data-bs-target="#exampleModal"]').forEach(function (btn) {
    if (btn.dataset.ipInquiryBound === "1") {
      return;
    }
    btn.dataset.ipInquiryBound = "1";
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      ipOpenInquiryModal();
    });
  });
}

function ipOpenInquiryModal() {
  initSiteFooter();
  consolidateInquiryModal();

  var modal = document.getElementById("exampleModal");
  if (!modal) {
    return;
  }

  modal.classList.add("ip-inquiry-modal", "ip-inquiry-open");

  try {
    clearBootstrapModalState();
  } catch (error) {
    /* ignore bootstrap cleanup errors */
  }

  var backdrop = ensureInquiryBackdrop();
  backdrop.classList.add("ip-inquiry-backdrop--on");
  backdrop.setAttribute("aria-hidden", "false");

  modal.style.setProperty("display", "flex", "important");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("ip-inquiry-body-lock");

  window.setTimeout(function () {
    var firstInput = modal.querySelector("#name, input.form-control, textarea.form-control");
    if (firstInput) {
      firstInput.focus();
    }
  }, 60);

  if (typeof window.ipInitInquiryForms === "function") {
    window.ipInitInquiryForms();
  }
}

function ipCloseInquiryModal() {
  var modal = document.getElementById("exampleModal");
  if (modal) {
    modal.classList.remove("ip-inquiry-open", "show");
    modal.style.setProperty("display", "none", "important");
    modal.setAttribute("aria-hidden", "true");
  }

  var backdrop = document.getElementById("ip-inquiry-backdrop");
  if (backdrop) {
    backdrop.classList.remove("ip-inquiry-backdrop--on");
    backdrop.setAttribute("aria-hidden", "true");
  }

  clearBootstrapModalState();
  document.body.classList.remove("ip-inquiry-body-lock");
}

window.ipOpenInquiryModal = ipOpenInquiryModal;
window.ipCloseInquiryModal = ipCloseInquiryModal;

function bindInquiryModalFix() {
  if (window.__ipInquiryModalBound) {
    return;
  }
  window.__ipInquiryModalBound = true;

  document.addEventListener("click", function (event) {
    var openTrigger = event.target.closest(
      '.inquiry-btn, [data-ip-inquiry-open], [data-bs-target="#exampleModal"]'
    );
    if (openTrigger) {
      event.preventDefault();
      event.stopImmediatePropagation();
      ipOpenInquiryModal();
      return;
    }

    if (event.target.id === "ip-inquiry-backdrop") {
      event.preventDefault();
      ipCloseInquiryModal();
      return;
    }

    if (event.target.closest(".inquiry-close-btn, [data-ip-inquiry-close]")) {
      var inquiryModal = document.getElementById("exampleModal");
      if (inquiryModal && inquiryModal.classList.contains("ip-inquiry-open")) {
        event.preventDefault();
        event.stopImmediatePropagation();
        ipCloseInquiryModal();
      }
    }
  }, true);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      var inquiryModal = document.getElementById("exampleModal");
      if (inquiryModal && inquiryModal.classList.contains("ip-inquiry-open")) {
        ipCloseInquiryModal();
      }
    }
  });

  var footerDiv = document.getElementById("footer-div");
  if (footerDiv && typeof MutationObserver !== "undefined") {
    new MutationObserver(function () {
      consolidateInquiryModal();
    }).observe(footerDiv, { childList: true, subtree: true });
  }
}

function initWhatsappShakeAnimation() {
  if (window.__ipWhatsappShakeBound) {
    return;
  }

  var whatsapp = document.getElementById("fixed-whatsapp-icon");
  if (!whatsapp) {
    return;
  }

  window.__ipWhatsappShakeBound = true;
  var shakeOn = true;
  setInterval(function () {
    if (shakeOn) {
      whatsapp.classList.add("shake-btn");
      shakeOn = false;
    } else {
      whatsapp.classList.remove("shake-btn");
      shakeOn = true;
    }
  }, 3000);
}

function initSmoothAnchorScroll() {
  if (window.__ipSmoothAnchorBound) {
    return;
  }

  window.__ipSmoothAnchorBound = true;
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var targetSelector = this.getAttribute("href");
      if (!targetSelector || targetSelector === "#") {
        return;
      }

      var target = document.querySelector(targetSelector);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function normalizeRecentProductLink(link) {
  if (!link || typeof link !== "string") {
    return link;
  }

  return link
    .replace(/([\\/])([^\\/]+)-dubai\.html(?=([#?].*)?$)/i, "$1$2.html")
    .replace(/([\\/])(advertising_flags|blade_flags|body_flags|car_desert_flags|car_flags|conference_flags|conference_hanging_flags|dashboard_flags|festival_flags|hand_held_flags|hand_waving_flags|hoisting_flags|l_shape_flags|pennant_flags|sail_flags|table_flags|tear_drop_flags|telescopic_flags|toothpick_flags|wall_mounted_flags)_dubai\.html(?=([#?].*)?$)/i, "$1$2.html");
}

function setRecommendProducts() {
  var productNameEl = document.getElementById("product-name");
  var productImgEl = document.getElementById("product-img");
  var recommendProductsDiv = document.getElementById("recommend-products-div");

  if (!productNameEl || !productImgEl || !recommendProductsDiv) {
    return;
  }

  var recommendProducts = JSON.parse(sessionStorage.getItem("recommend-products") || "[]");
  var recommendProductsChanged = false;

  recommendProducts = recommendProducts.map(function (product) {
    var normalizedLink = normalizeRecentProductLink(product.productLink);
    if (normalizedLink !== product.productLink) {
      recommendProductsChanged = true;
      return Object.assign({}, product, { productLink: normalizedLink });
    }
    return product;
  });

  var breadcrumbItems = document.querySelectorAll(".breadcrumb-item");
  if (breadcrumbItems.length > 1) {
    var secondBreadcrumbLink = breadcrumbItems[1].querySelector("a");
    if (secondBreadcrumbLink) {
      localStorage.setItem("category", JSON.stringify(secondBreadcrumbLink.textContent.trim()));
    }
  }

  if (recommendProducts.length < 6) {
    var currentProductExists = recommendProducts.some(function (product) {
      return product.productName === productNameEl.innerText.trim();
    });

    if (!currentProductExists) {
      recommendProducts.push({
        productName: productNameEl.innerText,
        productImg: productImgEl.src,
        productLink: normalizeRecentProductLink(window.location.href)
      });
      recommendProductsChanged = true;
    }

    if (recommendProductsChanged) {
      sessionStorage.setItem("recommend-products", JSON.stringify(recommendProducts));
    }
  }

  if (recommendProductsChanged && recommendProducts.length >= 6) {
    sessionStorage.setItem("recommend-products", JSON.stringify(recommendProducts));
  }

  var recommendProductsHeading = document.getElementById("recommend-products-heading");
  recommendProducts.forEach(function (product) {
    if (product.productName.trim() === productNameEl.innerText.trim()) {
      return;
    }

    var productCart = document.createElement("a");
    productCart.setAttribute("href", normalizeRecentProductLink(product.productLink));

    var productDiv = document.createElement("div");
    var productName = document.createElement("h4");
    productName.style.textAlign = "center";
    productName.className = "h6";
    productName.innerText = product.productName;

    var productImg = document.createElement("img");
    productImg.style.width = "100%";
    productImg.src = product.productImg;

    productDiv.append(productImg, productName);
    productCart.append(productDiv);
    recommendProductsDiv.append(productCart);

    if (recommendProductsHeading) {
      recommendProductsHeading.style.display = "block";
    }
  });
}

function initProductImageGalleries() {
  document.querySelectorAll(".fotorama.grumpy-image-wrapper").forEach(function (gallery) {
    if (gallery.dataset.productGalleryReady === "true") {
      return;
    }

    var images = Array.from(gallery.querySelectorAll("img"))
      .map(function (img) {
        return {
          src: img.getAttribute("src"),
          alt: img.getAttribute("alt") || "",
          id: img.id || ""
        };
      })
      .filter(function (img) {
        return img.src;
      });

    if (images.length < 2) {
      return;
    }

    gallery.dataset.productGalleryReady = "true";
    gallery.classList.remove("fotorama");
    gallery.classList.add("product-gallery");
    gallery.replaceChildren();

    var main = document.createElement("div");
    main.className = "product-gallery-main";

    var mainImage = document.createElement("img");
    mainImage.src = images[0].src;
    mainImage.alt = images[0].alt;
    if (images[0].id) {
      mainImage.id = images[0].id;
    }
    main.appendChild(mainImage);

    var thumbs = document.createElement("div");
    thumbs.className = "product-gallery-thumbs";

    var prevButton = document.createElement("button");
    prevButton.type = "button";
    prevButton.className = "product-gallery-arrow prev";
    prevButton.setAttribute("aria-label", "Previous product images");
    prevButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

    var nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.className = "product-gallery-arrow next";
    nextButton.setAttribute("aria-label", "Next product images");
    nextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

    var viewport = document.createElement("div");
    viewport.className = "product-gallery-thumbs-viewport";

    var track = document.createElement("div");
    track.className = "product-gallery-thumbs-track";

    viewport.appendChild(track);
    thumbs.append(prevButton, viewport, nextButton);
    gallery.append(main, thumbs);

    var activeIndex = 0;
    var thumbOffset = 0;
    var thumbButtons = [];

    function visibleThumbs() {
      return window.innerWidth < 768 ? 2 : 4;
    }

    function updateThumbOffset() {
      var step = thumbButtons[0] ? thumbButtons[0].getBoundingClientRect().width + 8 : 0;
      track.style.transform = "translateX(-" + (thumbOffset * step) + "px)";
      prevButton.disabled = thumbOffset === 0;
      nextButton.disabled = thumbOffset >= Math.max(0, images.length - visibleThumbs());
    }

    function setActive(index) {
      activeIndex = index;
      var image = images[index];
      mainImage.src = image.src;
      mainImage.alt = image.alt;

      thumbButtons.forEach(function (button, buttonIndex) {
        button.classList.toggle("is-active", buttonIndex === index);
      });

      var maxOffset = Math.max(0, images.length - visibleThumbs());
      if (activeIndex < thumbOffset) {
        thumbOffset = activeIndex;
      } else if (activeIndex >= thumbOffset + visibleThumbs()) {
        thumbOffset = Math.min(maxOffset, activeIndex - visibleThumbs() + 1);
      }

      updateThumbOffset();
    }

    images.forEach(function (image, index) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "product-gallery-thumb";
      button.setAttribute("aria-label", "View product image " + (index + 1));

      var thumbImage = document.createElement("img");
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
  document.querySelectorAll(".swiper.mySwiper").forEach(function (root) {
    var track = root.querySelector(".swiper-wrapper");
    var slides = track ? Array.from(track.querySelectorAll(".swiper-slide")) : [];
    var heading = root.parentElement ? root.parentElement.querySelector(".products-heading") : null;
    var headingText = heading ? heading.textContent.trim().toLowerCase() : "";
    var looksLikeRelatedProducts =
      headingText === "related products" &&
      slides.length > 0 &&
      slides.every(function (slide) {
        return slide.querySelector(".product-card");
      });

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

    var oldPrev = root.querySelector(".swiper-button-prev");
    var oldNext = root.querySelector(".swiper-button-next");
    if (oldPrev) oldPrev.remove();
    if (oldNext) oldNext.remove();

    root.classList.remove("swiper", "mySwiper", "swiper-initialized", "swiper-horizontal", "swiper-backface-hidden");
    root.style.removeProperty("overflow");

    track.classList.add("related-products-track");
    track.style.removeProperty("transform");
    track.style.removeProperty("transition-duration");

    slides.forEach(function (slide) {
      slide.style.removeProperty("width");
      slide.style.removeProperty("margin-right");
    });

    var viewport = root.querySelector(".related-products-viewport");
    if (!viewport) {
      viewport = document.createElement("div");
      viewport.className = "related-products-viewport";
      root.insertBefore(viewport, track);
      viewport.appendChild(track);
    }

    var prevButton = root.querySelector(".related-products-arrow.prev");
    var nextButton = root.querySelector(".related-products-arrow.next");

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

    var currentIndex = 0;

    function getVisibleCount() {
      return window.innerWidth < 768 ? 2 : 4;
    }

    function getGap() {
      var styles = window.getComputedStyle(track);
      return parseFloat(styles.columnGap || styles.gap || "0");
    }

    function updateCarousel() {
      var visibleCount = getVisibleCount();
      var maxIndex = Math.max(0, slides.length - visibleCount);
      currentIndex = Math.min(currentIndex, maxIndex);

      var slideWidth = slides[0] ? slides[0].getBoundingClientRect().width : 0;
      var offset = currentIndex * (slideWidth + getGap());
      track.style.transform = "translateX(-" + offset + "px)";

      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex >= maxIndex;
    }

    prevButton.addEventListener("click", function () {
      currentIndex = Math.max(0, currentIndex - getVisibleCount());
      updateCarousel();
    });

    nextButton.addEventListener("click", function () {
      var maxIndex = Math.max(0, slides.length - getVisibleCount());
      currentIndex = Math.min(maxIndex, currentIndex + getVisibleCount());
      updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
    updateCarousel();
  });
}

function openCity(evt, cityName) {
  var tabcontent = document.getElementsByClassName("tabcontent");
  var tablinks = document.getElementsByClassName("tablinks");
  var i;

  for (i = 0; i < tabcontent.length; i += 1) {
    tabcontent[i].style.display = "none";
  }

  for (i = 0; i < tablinks.length; i += 1) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  var activeTab = document.getElementById(cityName);
  if (activeTab) {
    activeTab.style.display = "block";
  }
  if (evt && evt.currentTarget) {
    evt.currentTarget.className += " active";
  }
}

function toggleDropdown(dropdownId) {
  var dropdown = document.getElementById(dropdownId);
  if (!dropdown) {
    return;
  }

  if (dropdown.classList.contains("show")) {
    dropdown.classList.remove("show");
    return;
  }

  Array.from(document.getElementsByClassName("btn-dropdown-content")).forEach(function (item) {
    item.classList.remove("show");
  });
  dropdown.classList.add("show");
}

function selectItem(buttonId, itemName) {
  var button = document.getElementById(buttonId);
  if (!button) {
    return;
  }

  button.innerHTML = itemName + ' <i style="pointer-events: none; background-color: lightgray; border-radius: 3px; padding: 5px 2px; color: gray;" class="fa-solid fa-caret-down"></i>';
  var dropdown = button.nextElementSibling;
  if (dropdown) {
    dropdown.classList.remove("show");
  }
}

function initProductDropdownCloseOnOutsideClick() {
  if (window.__ipProductDropdownOutsideBound) {
    return;
  }

  window.__ipProductDropdownOutsideBound = true;
  document.addEventListener("click", function (event) {
    if (event.target.matches(".dropbtn")) {
      return;
    }

    Array.from(document.getElementsByClassName("btn-dropdown-content")).forEach(function (dropdown) {
      dropdown.classList.remove("show");
    });
  });
}

function initProductTabs() {
  if (window.__ipProductTabsBound || typeof window.jQuery === "undefined") {
    return;
  }

  var $ = window.jQuery;
  if (!$(".tabs-stage").length) {
    return;
  }

  window.__ipProductTabsBound = true;
  $(".tabs-stage div").hide();
  $(".tabs-stage div:first").show().addClass("active");
  $(".product-tabs-nav li:first").addClass("tab-active");

  $(".product-tabs-nav a").on("click", function (event) {
    event.preventDefault();
    $(".product-tabs-nav li").removeClass("tab-active");
    $(this).parent().addClass("tab-active");
    $(".tabs-stage div").hide().removeClass("active");
    $($(this).attr("href")).addClass("active").fadeIn();
  });
}

function initBeforeAfterSlider() {
  var container = document.querySelector(".container-ab");
  var slider = document.querySelector(".slider-ab");
  if (!container || !slider) {
    return;
  }

  slider.addEventListener("input", function (event) {
    container.style.setProperty("--position", event.target.value + "%");
  });
}

function initProductPageFeatures() {
  if (!document.getElementById("product-name") && !document.querySelector(".fotorama.grumpy-image-wrapper") && !document.querySelector(".tabs-stage")) {
    return;
  }

  setRecommendProducts();
  initProductImageGalleries();
  initRelatedProductsCarousels();
  initProductTabs();
  initProductDropdownCloseOnOutsideClick();
  initBeforeAfterSlider();
}

window.openCity = openCity;
window.toggleDropdown = toggleDropdown;
window.selectItem = selectItem;

function initSiteChrome() {
  ipEnsureFooterPlacement();
  initSiteFooter();
  consolidateInquiryModal();
  bindInquiryModalFix();
  initBottomContactBar();
  wireInquiryButtons();
  initWhatsappShakeAnimation();
  initSmoothAnchorScroll();
  initProductPageFeatures();
  syncBottomBarLayout();
  setTimeout(function () {
    initBottomContactBar();
    wireInquiryButtons();
    syncBottomBarLayout();
    consolidateInquiryModal();
  }, 800);
  setTimeout(function () {
    consolidateInquiryModal();
    wireInquiryButtons();
  }, 1500);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", pruneRemovedProductsFromSite);
  document.addEventListener("DOMContentLoaded", initSiteChrome);
} else {
  pruneRemovedProductsFromSite();
  initSiteChrome();
}

