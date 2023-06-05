import styles from "./styles.module.css";
import React, { useState } from "react";

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
  FaFacebookF,
  FaFacebook,
  FaFacebookSquare,
  FaTwitter,
  FaRedditAlien,
} from "react-icons/fa";

const FaIcon = ({
  icon = "QuestionCircle",
  color = "#000000",
  outlineType = null,
  size = "md",
  hoverColor,
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
  const [iconColor, setIconColor] = useState(color);
  const tagProps = { color: iconColor, size: tagSize };

  const outlineTypes = {
    circle: "50%",
    square: "25%",
  };

  const IconComponents = {
    FacebookF: FaFacebookF,
    Facebook: FaFacebook,
    FacebookSquare: FaFacebookSquare,
    Twitter: FaTwitter,
    RedditAlien: FaRedditAlien,
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

  const handleMouseEnter = () => {
    setIconColor(hoverColor ? hoverColor : color);
  };

  const handleMouseLeave = () => {
    setIconColor(color);
  };

  return (
    <>
      {outlineType && (
        <div
          style={{
            border: "1px solid " + iconColor,
            width: tagSize,
            minWidth: tagSize,
            borderRadius: outlineTypes[outlineType] || "0px",
            padding: 0,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ThisIcon {...tagProps} style={{ padding: "20%" }} />
        </div>
      )}
      {!outlineType && <ThisIcon {...tagProps} />}
    </>
  );
};

export default FaIcon;
