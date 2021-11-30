/*
 *
 *   Copyright StoryGraf - 2021
 *
 *
 */

// The icons needed
import {
  FaTag,
  FaQuestionCircle,
  FaUserAstronaut,
  FaUser,
  FaInfoCircle,
  FaList,
  FaCogs,
  FaEnvelope,
  FaCog,
  FaChevronRight,
  FaChevronLeft,
  FaChevronUp,
  FaChevronDown,
  FaTasks,
  FaCubes,
  FaPlusSquare,
  FaBook,
  FaBriefcase,
  FaLaptop,
  FaKey,
  FaDollarSign,
  FaCalendar,
  FaCalendarAlt,
  FaCalendarDay,
  FaCross,
  FaTrash,
  FaCartPlus,
  FaTruck,
  FaTruckLoading,
  FaTruckMoving,
  FaPlus,
  FaMinus,
  FaPlusCircle,
  FaMinusCircle,
  FaThLarge,
  FaThList,
  FaShoppingCart,
  FaPalette,
  FaPencilRuler,
  FaCreditCard,
  FaClipboardCheck,
  FaLifeRing,
  FaListUl,
  FaClipboardList,
  FaCommentDollar,
  FaDownload,
  FaFileDownload,
  FaCube,
  FaTimes,
  FaTimesCircle,
  FaBars,
  FaCopy,
} from "react-icons/fa";

const FaIcon = ({ icon }) => {
  return (
    <>
      {icon === "Tag" && <FaTag />}
      {icon === "FileDownload" && <FaFileDownload />}
      {icon === "Download" && <FaDownload />}
      {icon === "QuestionCircle" && <FaQuestionCircle />}
      {icon === "UserAstronaut" && <FaUserAstronaut />}
      {icon === "User" && <FaUser />}
      {icon === "CommentDollar" && <FaCommentDollar />}
      {icon === "InfoCircle" && <FaInfoCircle />}
      {icon === "List" && <FaList />}
      {icon === "ClipboardList" && <FaClipboardList />}
      {icon === "ListUl" && <FaListUl />}
      {icon === "Cogs" && <FaCogs />}
      {icon === "Envelope" && <FaEnvelope />}
      {icon === "Key" && <FaKey />}
      {icon === "Cog" && <FaCog />}
      {icon === "ChevronRight" && <FaChevronRight />}
      {icon === "ChevronLeft" && <FaChevronLeft />}
      {icon === "ChevronUp" && <FaChevronUp />}
      {icon === "ChevronDown" && <FaChevronDown />}
      {icon === "Cubes" && <FaCubes />}
      {icon === "Cube" && <FaCube />}
      {icon === "Tasks" && <FaTasks />}
      {icon === "PlusSquare" && <FaPlusSquare />}
      {icon === "Book" && <FaBook />}
      {icon === "Briefcase" && <FaBriefcase />}
      {icon === "Laptop" && <FaLaptop />}
      {icon === "Dollar" && <FaDollarSign />}
      {icon === "Copy" && <FaCopy />}
      {icon === "Calendar" && <FaCalendar />}
      {icon === "CalendarAlt" && <FaCalendarAlt />}
      {icon === "CalendarDay" && <FaCalendarDay />}
      {icon === "Cross" && <FaCross />}
      {icon === "CartPlus" && <FaCartPlus />}
      {icon === "Truck" && <FaTruck />}
      {icon === "TruckLoading" && <FaTruckLoading />}
      {icon === "TruckMoving" && <FaTruckMoving />}
      {icon === "Trash" && <FaTrash />}
      {icon === "Plus" && <FaPlus />}
      {icon === "PlusCircle" && <FaPlusCircle />}
      {icon === "Minus" && <FaMinus />}
      {icon === "MinusCircle" && <FaMinusCircle />}
      {icon === "ThList" && <FaThList />}
      {icon === "ThLarge" && <FaThLarge />}
      {icon === "ShoppingCart" && <FaShoppingCart />}
      {icon === "Palette" && <FaPalette />}
      {icon === "PencilRuler" && <FaPencilRuler />}
      {icon === "CreditCard" && <FaCreditCard />}
      {icon === "ClipboardCheck" && <FaClipboardCheck />}
      {icon === "LifeRing" && <FaLifeRing />}
      {icon === "Close" && <FaTimes />}
      {icon === "CloseCircle" && <FaTimesCircle />}
      {icon === "Bars" && <FaBars />}

      {icon === "settings" && <FaCog />}
      {icon === "filter_list" && <FaBars />}
    </>
  );
};

export default FaIcon;
