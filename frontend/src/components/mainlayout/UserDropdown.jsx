import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "./UserDropdown.css";

export default function UserMenuPopup({
  isOpen,
  onClose,
  containerRef,
  userAvatar,
  userName
}) {
  const popupRef = useRef(null);
  const navigate = useNavigate();

  // close when clicking outside (same logic as other popups)
  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        containerRef?.current &&
        !containerRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen, onClose, containerRef]);

  const go = (path) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="user-dd" ref={popupRef}>
      {/* Header */}
      <div className="user-dd-header">
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userName || "User"}
            className="user-dd-avatar"
            loading="lazy"
          />
        ) : (
          <div className="user-dd-avatar fallback">
            {(userName || "U")[0].toUpperCase()}
          </div>
        )}

        <div className="user-dd-info">
          <strong>{userName || "User"}</strong>
          <span>Account</span>
        </div>
      </div>

      {/* Actions */}
      <div className="user-dd-list">
        <button onClick={() => go("/myprofile")}>My profile</button>
        <button className="danger" onClick={() => go("/logout")}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="icon" />
          Log out
        </button>
      </div>
    </div>
  );
}
