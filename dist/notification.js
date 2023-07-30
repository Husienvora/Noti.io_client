const notification_Style = (
  backgroundColor,
  Symbol,
  textColor,
  borderRadius,
  MaxWidth,
  MinWidth
) => {
  console.log(Symbol);
  return `
#notifications {
  z-index: 1;
  position: fixed;
  top: 10px;
  right: 15px;
}

#notifications li {
  margin-bottom: 5px;
  list-style: none;
}

.notification {
  position: relative;
  max-width: ${MaxWidth ? MaxWidth : "600px"};
  min-width: ${MinWidth ? MinWidth : "250px"};
  background: ${backgroundColor ? backgroundColor : "#808080"};
  z-index: 100;
  color:  ${textColor ? textColor : "#fff"};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius:${borderRadius ? borderRadius : "5px"} ;
  padding-left: 40px; /* Add space for the notification symbol */
}

.notification::before {
  content: ${
    Symbol ? `"${Symbol}"` : `"🔔"`
  } ;/* Insert your notification symbol here (Unicode or an image can be used) */
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px; /* Adjust the size of the symbol as needed */
}

.notification .content {
  padding: 15px 20px;
}

.notification .title {
  margin: 0 0 5px 0;
  font-size: 16px;
  font-weight: bold;
}

.notification p {
  margin: 0;
  padding: 0;
  font-size: 0.9em;
}

.notification .close {
  position: absolute;
  top: 5px;
  right: 10px;
  text-decoration: none;
  color: #888;
  display: none;
}

.notification.closable .close {
  display: block;
}

.notification .close:hover {
  color: black;
}

.notification .close:active {
  margin-top: 1px;
}

/* Close button */
.notification .close {
  position: absolute;
  top: 3px;
  right: 10px;
  text-decoration: none;
  color: #888;
  font-size: 16px;
  font-weight: bold;
  display: none;
}

/* Slide effect */
.notification.slide {
  transition: opacity 300ms, top 300ms;
}

.notification.slide.hide {
  opacity: 0;
  top: -500px;
}

/* Fade effect */
.notification.fade {
  transition: opacity 300ms;
}

.notification.fade.hide {
  opacity: 0;
}

/* Scale effect */
.notification.scale {
  transition: transform 300ms;
  transform: scale(1);
}

.notification.scale.hide {
  transform: scale(0);
}

/* Common styles for .warn and .error classes */
.notification.warn,
.notification.error {
  color: white;
  border-radius: 5px;
  padding: 15px 20px;
  font-size: 14px;
}

/* Styles for .warn class */
.notification.warn {
  background: #f39c12;
  border: 1px solid #e67e22;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Styles for .error class */
.notification.error {
  background: #e74c3c;
  border: 1px solid #c0392b;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  font-weight: bold;
}
`;
};

export default notification_Style;
