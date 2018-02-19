var AddAvilibleLocation = function(listId, key) {
    var clone = $(listId + ' .template').clone();
    var loc = Locations[key];
    clone.toggleClass('template');
    clone.data('id', key);
    clone.find('.img').css('background-image', 'url(img/map/'+key+'.jpg)');
    clone.find('.title').text(loc.Name);
    clone.appendTo($(listId));
}

var PopulateLocations = function() {
    $('#completed_locations li, #availible_locations li').not('.template').each(function(){ $(this).remove() });

    for (var key in Gloomhaven.data.CompletedLocations) {
        AddAvilibleLocation('#completed_locations', key);
    }

    for (var key in Gloomhaven.data.AvailibleLocations) {
        AddAvilibleLocation('#availible_locations', key);
    }
};

$(function() {
    $('#add_location').on('click', function() {
        Gloomhaven.AddLocation($('#location_key').val());
        PopulateLocations();
    });

    $('#availible_locations').on('click','.complete', function() {
        var key = $(this).closest('li').data('id');
        var name = Locations[key].Name;
        if (confirm('Are you sure you have completed #'+ key +' "'+ name+'"?'))
        {
            Gloomhaven.CompleteLocation(key);
            PopulateLocations();
        }
    });

    $('#availible_locations').on('click','.start', function() {
        var key = $(this).closest('li').data('id');
        var name = Locations[key].Name;
        if (confirm('You will now start scenario #'+ key +' "'+ name+'"')) {            
            Gloomhaven.StartScenario(key);
            UpdateScenarioView();
        }
    });

    $('#completed_locations').on('click','.remove', function() {
        var key = $(this).parent('li').data('id');
        var name = Locations[key].Name;
        if (confirm('Are you sure you want to remove #'+ key +' "'+ name+'" from the completed list?'))
        {
            Gloomhaven.ResetLocation(key);
            $(this).parent('li').remove();
        }
    });

    PopulateLocations();

    var $loc = $('#location_key');
    for (var key in Locations) {
        $loc.append($('<option>', {
            value: key,
            text: key+". "+ Locations[key].Name
        }));
    }
});