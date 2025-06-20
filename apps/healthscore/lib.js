exports.getData = function(hs_data, settings) {
    var total = { a: 0, i: 0 };
    for (var i = 0; i < 7; i++) {
        var date = new Date();
        date.setDate(date.getDate() - i);
        var dateString = date.toISOString().slice(0, 10);
        
        if (hs_data[dateString]) {
            for (var j = 0; j < hs_data[dateString].t.length; j++) {
                var steps = hs_data[dateString].t[j];
                if (steps >= settings.activeThreshold) {
                    total.a += 1; // Count this minute as active
                }
                if (steps >= settings.intenseThreshold) {
                    total.i += 1; // Count this minute as intense
                }
            }
            // Add the minutes from the active and intense counts
            total.a += hs_data[dateString].a;
            total.i += hs_data[dateString].i;
        }
    }
    return total;
}
