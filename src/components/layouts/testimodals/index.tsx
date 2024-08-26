import supabase from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default function Testimodals() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("testimoni").select();
      if (data) {
        setData(data);
      } else {
        // console.log(error);
      }
    };
    getData();
  }, []);

  const closeModal = (index: number) => {
    const modal = document.querySelectorAll(".modal-container")[index];
    if (modal) {
      modal.classList.remove("active");
    }
  };

  return (
    <div>
      {data.map((testimonials_data, index) => (
        <div key={index} className="modal-container" data-modal-container>
          <div
            className="overlay"
            data-overlay
            onClick={() => closeModal(index)}
          ></div>

          <section className="testimonials-modal">
            <button
              className="modal-close-btn"
              data-modal-close-btn
              onClick={() => closeModal(index)}
            >
              <FontAwesomeIcon icon= {faClose}/>
            </button>

            <div className="modal-img-wrapper">
              <figure className="modal-avatar-box">
                <img
                  src="/images/avatar-1.png"
                  alt={testimonials_data?.testi_name || "Name"}
                  width="80"
                  data-modal-img
                />
              </figure>

              <img src="/images/icon-quote.svg" alt="quote icon" />
            </div>

            <div className="modal-content">
              <h4 className="h3 modal-title" data-modal-title>
                {" "}
                {testimonials_data?.testi_name || "Name"}
              </h4>

              <time dateTime="2021-06-14">
                {testimonials_data?.date || "DD/MM/YY"}
              </time>

              <div data-modal-text>
                <p>
                  {testimonials_data?.testi_desc || "My Testimonial Message"}
                </p>
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}
