WaterBug = new Object();
WaterBug.load = function() {
  WaterBug.inspect_mode = 0;

  WaterBug.display_wrapper = new Element('div', {id: 'water_bug_display_wrapper', style:"position:absolute; bottom: 0px; left: 0px; width: 100%; height: 300px; background-color: #000; padding: 0px; z-index: 1000;"});
  WaterBug.display1 = new Element('div', {style:"width: 550px; margin: 10px; background-color: #FFF; overflow: scroll; height: 260px; padding: 10px; overflow: hidden; float: left;"});
  WaterBug.display2 = new Element('div', {style:"width: 550px; margin: 10px; background-color: #FFF; overflow: scroll; height: 260px; padding: 10px; overflow: hidden; float: left;"});
  WaterBug.display3 = new Element('div', {style:"display: none; clear: both;"});
  WaterBug.close_link = new Element('a', {style:"width: 40px; height: 20px; color: #FFF; position: absolute; top: 1px; right: 1px; font-size: 7px; cursor: pointer;"});
  WaterBug.hide_link = new Element('a', {style:"width: 40px; height: 20px; color: #FFF; position: absolute; top: 1px; right: 25px; font-size: 7px; cursor: pointer;"});
  WaterBug.label = new Element('p', {style:"width: 100px; height: 20px; color: #FFF; position: absolute; top: 1px; right: 50%; font-size: 7px;"});
  WaterBug.close_link.innerHTML='X close';
  WaterBug.hide_link.innerHTML='_ hide';
  WaterBug.label.innerHTML='WaterBug';
  WaterBug.close_link.onclick = function(){WaterBug.unload();};
  WaterBug.hide_link.onclick = function(){WaterBug.toggle_visibility();};
  WaterBug.label.onclick = function(){window.loaction="http://applicake.com/";};
  WaterBug.display_wrapper.insert(WaterBug.display1, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.display2, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.display3, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.hide_link, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.close_link, {position:'bottom'});
  WaterBug.display_wrapper.insert(WaterBug.label, {position:'bottom'});
  document.body.insert(WaterBug.display_wrapper, {position:'bottom'});
  WaterBug.display1.innerHTML = '<textarea id="water_bug_command_history" style="width: 400px; height: 200px;"></textarea><input type="text" id="water_bug_command_line" style="width: 300px;" /><input type="submit" id="water_bug_command_button" />';
  WaterBug.display2.innerHTML = '<a href="#" id="water_bug_inspect_button">INSPECT</a><br /><p id="wb_object_name"></p>';

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
WaterBug.toggle_visibility = function() {
  if (0 + WaterBug.display_wrapper.style.height.replace("px", "") > 100)
    WaterBug.display_wrapper.style.height = '12px';
  else
    WaterBug.display_wrapper.style.height = '300px';
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
      if ((element.id != 'water_bug_display_wrapper') && (!element.descendantOf('water_bug_display_wrapper'))) {
        element.onclick = function() {
          WaterBug.inspect(this);
        }
        element.onmouseover = function(){WaterBug.highlight(element); return true;};
        element.onmouseout = function(){WaterBug.unhighlight(element); return true;};
      }
    });
  }
};
WaterBug.inspect = function(element) {
  if ((!WaterBug.skip_inspecting) || (new Date - WaterBug.skip_inspecting > 500)) {
    WaterBug.skip_inspecting = new Date;
    var element_tree = '';
    var current_element = element;
    while ((current_element) && (current_element.identify)) {
      element_tree = ' > ' + current_element.tagName + '#' + current_element.identify() + element_tree;
      current_element = current_element.up();
    }
    WaterBug.display2.down('p').innerHTML = element_tree;
  }
}
WaterBug.highlight = function(element) {
  if ((!WaterBug.skip_highlighting) || (new Date - WaterBug.skip_highlighting > 100)) {
    if ((element) && (element.style) && (!(element.wb_highlighted))) {
      element.wb_highlighted = 1;
      WaterBug.skip_highlighting = new Date;
      element.original_border = element.style.border;
      element.style.border = "1px dotted #F00";
    }
  }
}
WaterBug.unhighlight = function(element) {
  if ((element) && (element.style) && (element.wb_highlighted)) {
    element.wb_highlighted = 0;
    WaterBug.skip_highlighting = null;
    element.style.border = element.original_border;
    element.original_border = null;
  }
}
