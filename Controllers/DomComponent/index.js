/**
 * Module dependencies.
 */

import dom from "dom";
import Emitter from "emitter";
import onBody from "on-body";
import template from "./template.js";
/**
 * Expose `notify`.
 */

export default notify;

/**
 * Notification list.
 */

const list = dom('<ul  id="notifications">');

/**
 * Append to body when it exists.
 */
const root = document.querySelector("#root");

const SetParent = (ele) => {
  if (ele) {
    list.appendTo(ele);
  } else {
    list.appendTo(document.querySelector("#root"));
  }
};
// onBody((body) => {
//   list.appendTo(root);
// });
export { SetParent };
/**
 * Return a new `Notification` with the given
 * (optional) `title` and `msg`.
 *
 * @param {String} title or msg
 * @param {String} msg
 * @return {Dialog}
 * @api public
 */

function notify(title, msg) {
  switch (arguments.length) {
    case 2:
      return new Notification({ title, message: msg }).show().hide(4000);
    case 1:
      return new Notification({ message: title }).show().hide(4000);
  }
}

/**
 * Construct a notification function for `type`.
 *
 * @param {String} type
 * @return {Function}
 * @api private
 */

function type(type) {
  return function (title, msg) {
    return notify.apply(this, arguments).type(type);
  };
}

/**
 * Notification methods.
 */

export const info = notify;
export const warn = type("warn");
export const error = type("error");

/**
 * Expose constructor.
 */

export { Notification };

/**
 * Initialize a new `Notification`.
 *
 * Options:
 *
 *    - `title` dialog title
 *    - `message` a message to display
 *
 * @param {Object} options
 * @api public
 */

class Notification {
  constructor(options) {
    Emitter.call(this);
    options = options || {};
    this.el = dom(template);
    this.render(options);
    if (options.classname) this.el.addClass(options.classname);
    if (Notification.effect) this.effect(Notification.effect);
  }
}

/**
 * Inherit from `Emitter.prototype`.
 */
Object.setPrototypeOf(Notification.prototype, Emitter.prototype);
// Notification.prototype = Object.create(Emitter.prototype);
// Notification.prototype.constructor = Notification;

/**
 * Render with the given `options`.
 *
 * @param {Object} options
 * @api public
 */

Notification.prototype.render = function (options) {
  const el = this.el;
  const title = options.title;
  const msg = options.message;
  const self = this;

  el.find(".close").on("click", function () {
    self.emit("close");
    self.hide();
    return false;
  });

  el.on("click", function (e) {
    e.preventDefault();
    self.emit("click", e);
  });

  el.find(".title").text(title);
  if (!title) el.find(".title").remove();

  // message
  if ("string" == typeof msg) {
    el.find("p").text(msg);
  } else if (msg) {
    el.find("p").replace(msg.el || msg);
  }

  setTimeout(function () {
    el.removeClass("hide");
  }, 0);
};

/**
 * Enable the dialog close link.
 *
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.closable = function () {
  this.el.addClass("closable");
  return this;
};

/**
 * Set the effect to `type`.
 *
 * @param {String} type
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.effect = function (type) {
  this._effect = type;
  this.el.addClass(type);
  return this;
};

/**
 * Show the notification.
 *
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.show = function () {
  this.el.appendTo(list);
  return this;
};

/**
 * Set the notification `type`.
 *
 * @param {String} type
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.type = function (type) {
  this._type = type;
  this.el.addClass(type);
  return this;
};

/**
 * Make it stick (clear hide timer), and make it closable.
 *
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.sticky = function () {
  return this.hide(0).closable();
};

/**
 * Hide the dialog with optional delay of `ms`,
 * otherwise the notification is removed immediately.
 *
 * @return {Number} ms
 * @return {Notification} for chaining
 * @api public
 */

Notification.prototype.hide = function (ms) {
  const self = this;

  // duration
  if ("number" == typeof ms) {
    clearTimeout(this.timer);
    if (!ms) return this;
    this.timer = setTimeout(function () {
      self.hide();
    }, ms);
    return this;
  }

  // hide / remove
  this.el.addClass("hide");
  if (this._effect) {
    setTimeout(
      function (self) {
        self.remove();
      },
      500,
      this
    );
  } else {
    self.remove();
  }

  return this;
};

/**
 * Hide the notification without potential animation.
 *
 * @return {Dialog} for chaining
 * @api public
 */

Notification.prototype.remove = function () {
  this.el.remove();
  return this;
};
