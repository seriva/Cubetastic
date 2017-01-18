class Console {
  constructor (engine) {
    var e = this.e = engine;
    var c = this;

    c.visible = false;
    c.logs = [];
    c.commands = [];

    //add css
    e.utils.addCSS(
        '#console {display: none; flex-flow: column nowrap; line-height: 95%; border:1px solid #999; border-bottom:1px solid #fff; background-color: #999; opacity: 0.75; z-index : 2; width: 100%; height: 50%; position: absolute; top: 0; left: 0; overflow: scroll; overflow-x: hidden;}' +
        '#console-input {display: none; color: #fff; font-size: 14px; position: absolute; top: 50%; left: 0; width:100%; border:1px solid #999; border-bottom:2px solid #fff; background-color: #999; opacity: 0.75; outline: none;}' +
        '#console p { margin-top: auto !important; font-size: 12px; color: #fff; margin: 0px; white-space: nowrap;}' +
        '#console-toggle { right: 15px; bottom:15px; margin: 0; padding: 5px; position: absolute; color: #000; font-size: 20px }'
    );

    //add console elements
    c.console = e.utils.addElement('div', 'console');
    c.inputfield = e.utils.addElement('input', 'console-input');
    c.inputfield.disabled = true;
    c.togglebutton = e.utils.addElement('button', 'console-toggle');
    c.togglebutton.innerHTML = 'console';

    //add console control
    var control = function (event) {
      switch (event.keyCode) {
          case 13:
              c.execute();
              break;
          case 192:
              c.toggle();
              break;
      }
    };
    window.addEventListener('keydown', control, false);
    c.togglebutton.addEventListener('click', function () {
        c.toggle();
    });
  }

  execute () {
    //TODO: add actual execution and registration
    var c = this;
    c.warn('Unknown command "' + c.inputfield.value + '"');
    c.inputfield.value = '';
  }

  toggle () {
    var c = this;
    c.visible = !c.visible;
    if (c.visible) {
        c.console.style.display = 'flex';
        c.inputfield.style.display = 'inline';
        c.inputfield.disabled = false;
        setTimeout(function () {
            c.inputfield.focus();
        }, 100)
        c.update();
    }else{
        c.console.style.display = c.inputfield.style.display = 'none';
        c.inputfield.disabled = true;
    }
  }

  update () {
    var c = this;
    var text = '<p>';
    for ( var i = 0; i < c.logs.length; i++) {
      var log = c.logs[i];
      var color = '#FFF';
      if (log.type === 'warning') {
         color = '#FF0';
      } if (log.type === 'error') {
          color = '#F00';
      }
      text = text + '<span style="color:' + color + '">' + log.message + '</span></br>';
    }
    c.console.innerHTML = text + '</p>';
    c.console.scrollTop = this.console.scrollHeight;
  }

  log (m) {
    console.log(m);
    this.logs.push({ 'type': 'log', 'message': m});
    this.update();
  }

  warn (m) {
    console.warn(m);
    this.logs.push({ 'type': 'warning', 'message': m});
    this.update();
  }

  error (m) {
    console.error(m);
    this.logs.push({ 'type': 'error', 'message': m});
    this.update();
    //throw new Error();
  }
}

export { Console as default };
