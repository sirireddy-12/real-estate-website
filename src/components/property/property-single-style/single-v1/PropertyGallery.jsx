import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import listings from "@/utilis/listingHelpers";

const FALLBACK_GALLERY = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&q=80",
  "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=600&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
];

const PropertyGallery = ({ id }) => {
  const idx = parseInt(id, 10);
  const data = (!isNaN(idx) && listings[idx]) ? listings[idx] : listings[0];
  const mainPhoto = data?.MainPhotoURL || FALLBACK_GALLERY[0];
  const thumbImages = FALLBACK_GALLERY;

  return (
    <Gallery>
      <div className="col-sm-6">
        <div className="sp-img-content mb15-md">
          <div className="popup-img preview-img-1 sp-img">
            <Item original={mainPhoto} thumbnail={mainPhoto} width={610} height={510}>
              {({ ref, open }) => (
                <img src={mainPhoto} ref={ref} onClick={open} alt="Main property" role="button" className="w-100 h-100 cover" />
              )}
            </Item>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="row">
          {thumbImages.map((src, index) => (
            <div className="col-6 ps-sm-0" key={index}>
              <div className="sp-img-content">
                <div className={`popup-img preview-img-${index + 2} sp-img mb10`}>
                  <Item original={src} thumbnail={src} width={270} height={250}>
                    {({ ref, open }) => (
                      <img className="w-100 h-100 cover" ref={ref} onClick={open} role="button" src={src} alt={`property ${index + 2}`} />
                    )}
                  </Item>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Gallery>
  );
};

export default PropertyGallery;
