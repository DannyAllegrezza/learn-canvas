function startScrolling() {
  var c = document.getElementById("canvas1");
  var scroller = new Scroller(c, "Welcome to my homepage! Sign my guestbook!", 1, "down", "#CC0000");
  scroller.doAnimation();
}

function Scroller(canvas, scrollingText, rate, direction, textColor) {
  this.canvas = canvas;
  this.text = scrollingText;
  this.textWidth = 0;
  this.textHeight = 12;
  this.yloc = 10;
  this.xloc = this.canvas.width;
  this.rate = rate;
  this.direction = direction;
  this.textColor = textColor;
  this.font = "12px Arial";
  var self = this;
  this.animId;
  if (this.direction == "up") {
    this.xloc = 0;
    this.yloc = this.canvas.height;
  } else if (this.direction == "down") {
    this.xloc = 0;
    this.yloc = 0;
  }
  this.doAnimation = function () {
    this.animId = requestAnimationFrame(function () {
      self.doAnimation();
    });

    if (this.textWidth == 0) {
      var context = this.canvas.getContext("2d");
      context.font = this.font;
      this.textWidth = context.measureText(this.text).width;
    }

    if (this.direction == "left") {
      if (this.textWidth + this.xloc < 0) {
        this.xloc = this.canvas.width;
      } else {
        this.xloc -= this.rate;
      }
    } else if (this.direction == "right") {
      if (this.xloc > this.canvas.width) {
        this.xloc = -this.textWidth;
      } else {
        this.xloc += this.rate;
      }
    } else if (this.direction == "up") {
      if (this.yloc < 0) {
        this.yloc = this.canvas.height + this.textHeight;
      } else {
        this.yloc -= this.rate;
      }
    } else if (this.direction == "down") {
      if (this.yloc > this.canvas.height + this.textHeight) {
        this.yloc = 0;
      } else {
        this.yloc += this.rate;
      }
    }
    this.drawText();
  };
  this.drawText = function () {
    var context = this.canvas.getContext("2d");
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context.font = this.font;
    context.fillStyle = this.textColor;
    context.fillText(this.text, this.xloc, this.yloc);
  };
}
