import styles from "./styles.module.css";

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

const FaIcon = ({
  icon = "Tag",
  color = "#000000",
  outlineType = null,
  size = "md",
}) => {
  let tagSize = size;
  if (size) {
    const tagSizes = {
      xs: "20px",
      sm: "25px",
      md: "30px",
      lg: "40px",
      xl: "60px",
      xxl: "80px",
    };
    tagSize = tagSizes[size] || size;
  }
  const tagProps = { color: color, size: tagSize };

  const outlineTypes = {
    circle: "50%",
    square: "25%",
  };

  const IconComponents = {
    Tag: FaTag,
    FileDownload: FaFileDownload,
    Download: FaDownload,
    QuestionCircle: FaQuestionCircle,
    UserAstronaut: FaUserAstronaut,
    User: FaUser,
    CommentDollar: FaCommentDollar,
    InfoCircle: FaInfoCircle,
    List: FaList,
    ClipboardList: FaClipboardList,
    ListUl: FaListUl,
    Cogs: FaCogs,
    Envelope: FaEnvelope,
    Key: FaKey,
    Cog: FaCog,
    ChevronRight: FaChevronRight,
    ChevronLeft: FaChevronLeft,
    ChevronUp: FaChevronUp,
    ChevronDown: FaChevronDown,
    Cubes: FaCubes,
    Cube: FaCube,
    Tasks: FaTasks,
    PlusSquare: FaPlusSquare,
    Book: FaBook,
    Briefcase: FaBriefcase,
    Laptop: FaLaptop,
    Dollar: FaDollarSign,
    Copy: FaCopy,
    Calendar: FaCalendar,
    CalendarAlt: FaCalendarAlt,
    CalendarDay: FaCalendarDay,
    Cross: FaCross,
    CartPlus: FaCartPlus,
    Truck: FaTruck,
    TruckLoading: FaTruckLoading,
    TruckMoving: FaTruckMoving,
    Trash: FaTrash,
    Plus: FaPlus,
    PlusCircle: FaPlusCircle,
    Minus: FaMinus,
    MinusCircle: FaMinusCircle,
    ThList: FaThList,
    ThLarge: FaThLarge,
    ShoppingCart: FaShoppingCart,
    Palette: FaPalette,
    PencilRuler: FaPencilRuler,
    CreditCard: FaCreditCard,
    ClipboardCheck: FaClipboardCheck,
    LifeRing: FaLifeRing,
    Close: FaTimes,
    CloseCircle: FaTimesCircle,
    Bars: FaBars,
    settings: FaCog,
    filter_list: FaBars,
  };

  const ThisIcon = IconComponents[icon];

  return (
    <>
      {outlineType && (
        <div
          style={{
            border: "1px solid " + color,
            width: tagSize,
            borderRadius: outlineTypes[outlineType] || "0px",
          }}
        >
          <ThisIcon {...tagProps} style={{ padding: "20%" }} />
        </div>
      )}
      {!outlineType && <ThisIcon {...tagProps} />}
    </>
  );
};

export default FaIcon;
