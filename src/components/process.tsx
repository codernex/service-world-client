import Container from "@/components/ui/container";
import ToolIcon from "./tool-icon";

export default function Process() {
  return (
    <Container className="process-bg py-10 lg:py-32">
      <div className="py-10 space-y-4">
        <p className="flex font-semibold font-RobotoMono justify-center items-center text-primary">
          <ToolIcon />
          আমরা যেভাবে কাজ করি
        </p>
        <h2 className="text-primary-foreground text-medium text-center">
          আমাদের স্ট্যান্ডার্ড ওয়ার্কিং প্রক্রিয়া
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="process-card-wrap">
          <div className="process-card">
            <div className="process-card_img">
              <img
                decoding="async"
                src="https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/process_card_1.jpg"
                alt="Image"
              />
              <div className="process-card_icon flex items-center justify-center">
                <img
                  decoding="async"
                  src="https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/process_card_1.svg"
                  alt="icon"
                />
              </div>
            </div>
            <h2 className="box-title">অনলাইনে বুকিং</h2>
            <p className="process-card_text">
              আপনি খুব সহজেই আমাদের সার্ভিসগুলো অনলাইনে বুকিং করতে পারবেন
            </p>
          </div>
        </div>
        <div className="process-card-wrap">
          <div className="process-card">
            <div className="process-card_img">
              <img
                decoding="async"
                src="https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/process_card_2.jpg"
                alt="Image"
              />
              <div className="process-card_icon flex items-center justify-center">
                <img
                  decoding="async"
                  src="https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/process_card_2.svg"
                  alt="icon"
                />
              </div>
            </div>
            <h2 className="box-title">পরিদর্শন &amp; বিশ্লেষণ</h2>
            <p className="process-card_text">
              আমাদের দক্ষ কর্মী আপনার সমস্যাটিকে পরিদর্শন করবে এবং বিশ্লেষণ করবে
            </p>
          </div>
        </div>
        <div className="process-card-wrap">
          <div className="process-card">
            <div className="process-card_img">
              <img
                decoding="async"
                src="https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/process_card_3.jpg"
                alt="Image"
              />
              <div className="process-card_icon flex items-center justify-center">
                <img
                  decoding="async"
                  src="https://themeholy.com/wordpress/plumer/wp-content/uploads/2023/04/process_card_3.svg"
                  alt="icon"
                />
              </div>
            </div>
            <h2 className="box-title">সমাধান</h2>
            <p className="process-card_text">
              আপনার সমস্যাটি সনাক্ত করার পর সেটি  একটি নির্ধারিত মূল্যে সমাধান করা হবে
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
