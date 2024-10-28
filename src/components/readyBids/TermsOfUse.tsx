import { Link } from "react-router-dom";
// import logo from "../../assets/logo-thailand-sababa1.png";
// import { PhoneIncoming } from "lucide-react";

const TermsOfUse = () => {
  return (
    <>
      <div
        dir="rtl"
        className="px-2 lg:px-36 mt-24 mb-20 space-y-4 md:space-y-4"
      >
        <p>
          לקוח יקר, שלום רב! לפניך תנאי הזמנה ומידע כללי אשר אנו ממליצים לקרוא
          בעיון רב. לתנאי הזמנה המלאים
          <Link to="#" className="font-bold text-blue-500">
            {" "}
            לחצו כאן
          </Link>
        </p>

        <p>
          <strong>זמינות החדרים ומחירם </strong>
          משתנים ללא הודעה מוקדמת, לכן אין התחייבות כלשהי על הזמינות או המחיר.
          הזמינות והמחיר אותו קיבלתם בהצעה רלוונטי לאותו רגע והאישור הסופי יתקבל
          רק לאחר אישור המלון.
        </p>

        <p>
          <strong>מיקום החדרים </strong>
          תלוי בזמינות החדרים במלון ונקבע על ידי המלונות בלבד. כמובן שאם יש
          בקשות מיוחדות אנחנו פונים למלון ומבקשים לכבדם, אם כי זו לא הבטחה
          וההחלטה הסופית נעשית על ידי המלון.
        </p>

        <p>
          <strong>זמינות הטיסות ומחירם </strong>
          משתנים ללא הודעה מוקדמת והמחיר בהצעה תקף לאותו הרגע בלבד.
          <strong> טיסות פנים </strong>
          לא ניתנים לשינוי או ביטול.
        </p>

        <p>
          <strong>החיוב מתבצע </strong>
          בשקלים ונקבע על ידי שער ההמרה אל מול הבאט לאותו יום.
        </p>
      </div>
      <div className="mb-8">
        {/* <div className="flex flex-col md:flex-row justify-between items-center lg:mx-36 gap-4">
          <div className="flex">
            <p>00000000 :טלפון</p>
            <span>
              <PhoneIncoming />
            </span>
          </div>
          <img className="w-24" src={logo} alt="img" />
          <p className="">Ⓒthailand-sababa.co.il</p>
        </div> */}
        <p className="text-center">Ⓒthailand-sababa.co.il</p>
      </div>
    </>
  );
};

export default TermsOfUse;
