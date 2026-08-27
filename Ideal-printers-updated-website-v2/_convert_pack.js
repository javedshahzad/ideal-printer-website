const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const srcDir = 'C:/Users/USER/.cursor/projects/d-Workplace-Angular-apps-ideal-printers-website-Ideal-printers-updated-website-v2/assets';
const destRoot = 'D:/Workplace/Angular-apps/ideal-printers-website/Ideal-printers-updated-website-v2';
const POS = ['centre','north','east','west','south','northeast','northwest','southeast','southwest'];
function expand(src, dests, w, h) {
  return dests.map((dest, i) => [src, dest, w, h, POS[i % POS.length]]);
}
const jobs = [
  ...expand('p19-notebook.png', [
    'images/print&marketing/custom_design_pu_notebook_lahore.webp?v=1.0.55',
    'images/print&marketing/sharp_corner_notebook_printing_lahore.webp?v=1.0.55',
    'images/print&marketing/hardcover_pu_notebook_lahore.webp?v=1.0.55',
    'images/print&marketing/hard_cover_notebook_lahore.webp?v=1.0.55',
    'images/print&marketing/l_corner_notebook_printing_lahore.webp?v=1.0.55',
    'images/print&marketing/softcover_pu_notebook_printing_in_lahore.webp?v=1.0.55',
    'images/print&marketing/premium_notebooks_in_lahore.webp?v=1.0.55',
    'images/print&marketing/custom_lined_notebook_printing_lahore_02.webp?v=1.0.55',
    'images/print&marketing/custom_blank_notebook_printing_lahore_02.webp?v=1.0.55',
    'images/print&marketing/personal_pu_notebook_lahore.webp?v=1.0.55',
    'images/print&marketing/color_printing_notebook_lahore.webp?v=1.0.55',
    'images/print&marketing/journal_books_lahore.webp?v=1.0.55',
    'images/print&marketing/hand_made_journal_books_printing_lahore.webp?v=1.0.55',
    'images/print&marketing/hand_made_journal_books_lahore.webp?v=1.0.55',
    'images/print&marketing/journal_printing_lahore.webp?v=1.0.55',
    'images/print&marketing/raised-spot-uv-notebook-lahore.webp?v=1.0.55',
    'images/print&marketing/raised-foiling-3d-notebook-lahore-01.webp?v=1.0.55',
    'images/print&marketing/premium_notebooks_printing_lahore.webp?v=1.0.55',
    'images/print&marketing/raised-foiling-3d-notebook-lahore.webp?v=1.0.55',
    'images/print&marketing/hand_made_books_lahore.webp?v=1.0.55',
    'images/print&marketing/notebook_inner_pages_lahore.webp?v=1.0.55',
    'images/print&marketing/notebook_inner_pages_lahore_01.webp?v=1.0.55',
    'images/print&marketing/yearly-diaries-printing-lahore.webp?v=1.0.55',
    'images/print&marketing/yearly-diaries-printing-lahore-01.webp?v=1.0.55',
  ], 1200, 900),
  ...expand('p19-kraftnote.png', [
    'images/print&marketing/scribble_notebook_lahore.webp?v=1.0.55',
    'images/print&marketing/scribble_books_printing_lahore.webp?v=1.0.55',
    'images/print&marketing/scribble_books_lahore.webp?v=1.0.55',
    'images/print&marketing/scribble_books_in_lahore.webp?v=1.0.55',
    'images/print&marketing/scribble_books.webp?v=1.0.55',
    'images/print&marketing/kraft_scribble_books_lahore.webp?v=1.0.55',
    'images/print&marketing/kraft_scribble_books_in_lahore.webp?v=1.0.55',
    'images/print&marketing/kraft_scribble_notebooks_lahore.webp?v=1.0.55',
    'images/print&marketing/kraft_scribble_notebook_printing_lahore.webp?v=1.0.55',
    'images/print&marketing/scribble_books_wraparound_lahore.webp?v=1.0.55',
    'images/print&marketing/scribble_books_wraparound_lahore_2.webp?v=1.0.55',
    'images/print&marketing/scribble_books_wraparound_lahore_3.webp?v=1.0.55',
    'images/print&marketing/scribble_books_wraparound_lahore_4.webp?v=1.0.55',
  ], 1200, 900),
  ...expand('p19-cutout.png', [
    'images/backdrops&exhibition/foam_board_cutout_standee_lahore.webp?v=1.0.55',
    'images/backdrops&exhibition/product_standee_thai_coco_lahore.webp?v=1.0.55',
    'images/backdrops&exhibition/product_standee_in_mall_lahore.webp?v=1.0.55',
    'images/backdrops&exhibition/product_standee_beach_lahore.webp?v=1.0.55',
    'images/backdrops&exhibition/promotional_forex_board_cutout_standee_lahore.webp?v=1.0.55',
    'images/backdrops&exhibition/products_standee_printing.webp?v=1.0.55',
    'images/backdrops&exhibition/party_hand_props_printing_lahore.webp?v=1.0.55',
    'images/backdrops&exhibition/forex_board_cutout_stand_lahore.webp?v=1.0.55',
    'images/backdrops&exhibition/party_forex_board_cutout_standee_lahore.webp?v=1.0.55',
    'images/backdrops&exhibition/forex_board_cutout_lahore.webp?v=1.0.55',
    'images/backdrops&exhibition/acp_cutout_standee_lahore.webp?v=1.0.55',
    'images/backdrops&exhibition/wooden_cutout_standee_lahore.webp?v=1.0.55',
  ], 900, 1200),
  ...expand('p19-caricature.png', [
    'images/backdrops&exhibition/barber_caricature_cutout_standee_lahore.webp?v=1.0.55',
    'images/backdrops&exhibition/racer_caricature_cutout_standee_lahore.webp?v=1.0.55',
    'images/backdrops&exhibition/youtuber_caricature_cutout_standee_lahore.webp?v=1.0.55',
    'images/backdrops&exhibition/queen_caricature_cutout_standee_lahore.webp?v=1.0.55',
  ], 900, 1200),
  ...expand('p19-dashflag.png', [
    'images/flags/dashboard_flags_printing_lahore_03.webp?v=1.0.55',
    'images/flags/dashboard_flags_printing_lahore_02.webp?v=1.0.55',
    'images/flags/dashboard_flags_printing_lahore_01.webp?v=1.0.55',
    'images/flags/dashboard-flags-thumb-lahore.webp?v=1.0.55',
  ], 1200, 900),
  ...expand('p19-stamp.png', [
    'images/print&marketing/date_stamp_lahore.webp?v=1.0.55',
    'images/print&marketing/date_time_stamp_lahore.webp?v=1.0.55',
    'images/print&marketing/manual_numbering_stamp_lahore.webp?v=1.0.55',
    'images/print&marketing/auto_numbering_stamp_lahore.webp?v=1.0.55',
    'images/print&marketing/date_and_numbering_stamps_lahore.webp?v=1.0.55',
  ], 1200, 900),
  ...expand('p19-windowfilm.png', [
    'images/office&store_branding/digital_printed_window_films_lahore.webp?v=1.0.55',
    'images/office&store_branding/decorative_window_films_lahore.webp?v=1.0.55',
  ], 1200, 900),
  ...expand('p19-tintfilm.png', [
    'images/office&store_branding/tinted_window_film_lahore.webp?v=1.0.55',
    'images/office&store_branding/mirror_finish_window_films_lahore.webp?v=1.0.55',
  ], 1200, 900),
  ...expand('p19-invoice.png', [
    'images/print&marketing/delivery_order_books_printing_lahore.webp?v=1.0.55',
    'images/print&marketing/delivery_order_printing_lahore_001.webp?v=1.0.55',
    'images/print&marketing/delivery_order_printing_lahore_002.webp?v=1.0.55',
    'images/print&marketing/delivery_order_printing_lahore_003.webp?v=1.0.55',
    'images/print&marketing/delivery_order_printing_lahore_004.webp?v=1.0.55',
    'images/print&marketing/delivery_order_printing_lahore_005.webp?v=1.0.55',
    'images/print&marketing/delivery_order_printing_lahore_006.webp?v=1.0.55',
  ], 1200, 900),
  ...expand('p19-apron.png', [
    'images/fabric&fashion/apron-printing-lahore.webp?v=1.0.55',
    'images/fabric&fashion/custom-apron-printing-lahore.webp?v=1.0.55',
    'images/fabric&fashion/custom-apron-printing-lahore-01.webp?v=1.0.55',
    'images/fabric&fashion/apron-printing-lahore-01.webp?v=1.0.55',
    'images/fabric&fashion/apron-dining-lahore-01.webp?v=1.0.55',
    'images/fabric&fashion/apron-printing-lahore-02.webp?v=1.0.55',
    'images/fabric&fashion/apron-sizes-lahore.webp?v=1.0.55',
    'images/fabric&fashion/waist-apron-dining-printing-lahore-01.webp?v=1.0.55',
    'images/fabric&fashion/waist-apron-dining-printing-lahore-02.webp?v=1.0.55',
    'images/fabric&fashion/waist-apron-dining-lahore.webp?v=1.0.55',
    'images/fabric&fashion/apron-thumb-lahore.webp?v=1.0.55',
  ], 1200, 900),
  ...expand('p19-tablecloth.png', [
    'images/fabric&fashion/dining_table_cloth_lahore_01.webp?v=1.0.55',
    'images/fabric&fashion/dining_table_runner_lahore_02.webp?v=1.0.55',
    'images/fabric&fashion/dining_table_runner_lahore_03.webp?v=1.0.55',
    'images/fabric&fashion/viscose_cotton_table_cover_lahore.webp?v=1.0.55',
    'images/fabric&fashion/rayon_linen_table_cover_lahore.webp?v=1.0.55',
    'images/fabric&fashion/velvet_table_cover_lahore.webp?v=1.0.55',
    'images/fabric&fashion/organza_table_cover_lahore.webp?v=1.0.55',
    'images/fabric&fashion/whisper_smooth_table_cover_lahore.webp?v=1.0.55',
    'images/fabric&fashion/size_table_cover_lahore.webp?v=1.0.55',
    'images/fabric&fashion/trimmed_corner_table_cover_lahore.webp?v=1.0.55',
    'images/fabric&fashion/regular_corner_table_cover_lahore.webp?v=1.0.55',
    'images/fabric&fashion/dining_table_cloth_thumb_lahore.webp?v=1.0.55',
  ], 1200, 900),
  ...expand('p19-placemat.png', [
    'images/fabric&fashion/placemat_lifestyle_lahore_01.webp?v=1.0.55',
    'images/fabric&fashion/placemat_lifestyle_lahore_02.webp?v=1.0.55',
    'images/fabric&fashion/placemat_lifestyle_lahore_03.webp?v=1.0.55',
    'images/fabric&fashion/duchess_satin_placemat_lahore.webp?v=1.0.55',
    'images/fabric&fashion/monroe_satin_placemat_lahore.webp?v=1.0.55',
    'images/fabric&fashion/placemat_thumb_lahore.webp?v=1.0.55',
  ], 1200, 900),
];
(async () => {
  for (const [src, dest, w, h, pos] of jobs) {
    const out = path.join(destRoot, dest);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(path.join(srcDir, src)).resize(w, h, { fit: 'cover', position: pos }).webp({ quality: 82 }).toFile(out);
    console.log('ok', dest);
  }
  console.log('done', jobs.length);
})().catch(e => { console.error(e); process.exit(1); });
