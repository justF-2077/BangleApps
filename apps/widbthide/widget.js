WIDGETS["bluetooth"]={area:"tr",draw:function() {
  if (WIDGETS.bluetooth.width==0)
    return;
  g.reset();
  g.setColor((g.getBPP()>8) ? "#07f" : (NRF.getSecurityStatus().connected ? (g.theme.dark ? "#0ff" : "#00f") : "#f00"));
  g.drawImage(atob("CxQBBgDgFgJgR4jZMawfAcA4D4NYybEYIwTAsBwDAA=="),2+this.x,2+this.y);
},changed:function() {
  WIDGETS.bluetooth.width = (NRF.getSecurityStatus().advertising || NRF.getSecurityStatus().connected || NRF.getSecurityStatus().bonded !== undefined)?15:0;
  Bangle.drawWidgets();
},width:(NRF.getSecurityStatus().advertising || NRF.getSecurityStatus().connected || NRF.getSecurityStatus().bonded !== undefined)?15:0
};
NRF.on('connect',WIDGETS.bluetooth.changed);
NRF.on('disconnect',WIDGETS.bluetooth.changed);
NRF.on('advertising',WIDGETS.bluetooth.changed);
NRF.on('bond',WIDGETS.bluetooth.changed);
NRF.on('error',WIDGETS.bluetooth.changed);
