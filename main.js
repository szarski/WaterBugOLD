WaterBug = new Object();
WaterBug.load = function() {
  WaterBug.inspect_mode = 0;

  WaterBug.display_wrapper = new Element('div', {style:"position:absolute; bottom: 50px; left: 50px; width: 600px; height: 300px; background-color: #000; padding: 0px; z-index: 1000;"});
  WaterBug.display = new Element('div', {style:"width: 550px; margin: 10px; background-color: #FFF; overflow: scroll; height: 280px; padding: 10px;"});
  WaterBug.close_link = new Element('a', {style:"width: 40px; height: 20px; color: #FFF; position: absolute; top: 1px; right: 1px; font-size: 7px; cursor: pointer"});
  WaterBug.close_link.innerHTML='X close';
  WaterBug.close_link.onclick = function(){WaterBug.unload();};
  WaterBug.display_wrapper.insert(WaterBug.display, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.close_link, {position:'bottom'});
  document.body.insert(WaterBug.display_wrapper, {position:'bottom'});
  WaterBug.display.innerHTML = '<textarea id="water_bug_command_history" style="width: 400px; height: 200px;"></textarea><input type="text" id="water_bug_command_line" /><input type="submit" id="water_bug_command_button" /><br /><a href="#" id="water_bug_inspect_button">INSPECT</a>';

  /******* initialize the cool stuff *******/

  WaterBug.command_button = $('water_bug_command_button');
  WaterBug.command_line = $('water_bug_command_line');
  WaterBug.command_history = $('water_bug_command_history');
  WaterBug.inspect_button = $('water_bug_inspect_button');
  WaterBug.command_button.onclick = WaterBug.run;
  WaterBug.inspect_button.onclick = WaterBug.toggle_inspect_mode;
}
WaterBug.unload = function() {
  WaterBug.display_wrapper.remove();
}
WaterBug.run = function(event, command) {
  if (!command) {
    command = WaterBug.command_line.value;
    WaterBug.command_line.value = '';
  }
  var hist = command + "\n= " + eval(command) + "\n\n";
  WaterBug.command_history.value += hist;
}
WaterBug.toggle_inspect_mode = function () {
  if (WaterBug.inspect_mode) { //Turn inspect mode off
    WaterBug.inspect_mode = 0;
    WaterBug.inspect_button.value="STOP INSPECTING";
  } else { // Turn inspect mode on
    WaterBug.inspect_mode = 1;
    WaterBug.inspect_button.value="INSPECT";
    $$('div').each (function(element) {
      element.onclick = function() {
        WaterBug.inspect(this);
      }
      element.onmouseover = function(){WaterBug.highlight(element);};
      element.onmouseout = function(){WaterBug.unhighlight(element);};
    });
  }
};
WaterBug.inspect = function(element) {
  WaterBug.command_history.value += 'ELEMENT: ' + element.identify() + "\n\n";
}
WaterBug.highlight = function(element) {
  if (element && element.style) {
    element._border = element.style.border;
    element.style.border = "1px dotted #F00";
  }
}
WaterBug.unhighlight = function(element) {
  if (element && element.style && element._border) {
    element.style.border = element._border;
  }
}
