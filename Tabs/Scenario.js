var UpdateScenarioView = function() {
    $('#manual_scenario_start').toggleClass('d-none', Gloomhaven.data.ScenarioIsActive == true);
    $('#scenario_view').toggleClass('d-none', Gloomhaven.data.ScenarioIsActive != true);
    if (Gloomhaven.data.ScenarioIsActive) {
        var loc = Locations[Gloomhaven.data.ScenarioKey];
        var name = loc.Name;
        $('#scenario_view h1').text(name);
    }    
    SetActiveTab(Gloomhaven.data.ActiveTab);
};

$(function() {

    $('#complete_scenario').on('click', function(){
        var key = Gloomhaven.data.ScenarioKey;
        var name = Locations[key].Name;
        if (confirm('Are you sure you have completed #'+ key +' "'+ name+'"?'))
        {
            Gloomhaven.CompleteLocation(key);
            PopulateLocations();
            UpdateScenarioView();
        }
    });
    
    $('#quit_scenario').on('click', function(){
        var key = Gloomhaven.data.ScenarioKey;
        var name = Locations[key].Name;
        if (confirm('Are you sure you want to quit scenario #'+ key +' "'+ name+'"?'))
        {
            Gloomhaven.QuitScenario();
            PopulateLocations();
            UpdateScenarioView();
        }
    });
    
    $('#start_scenario').on('click', function() {
        var key = $('#scenario_key').val();
        var name = Locations[key].Name;
        if (confirm('You will now start scenario #'+ key +' "'+ name+'"')) {            
            Gloomhaven.StartScenario(key);
            UpdateScenarioView();
        }
    });

    var $loc = $('#scenario_key');
    for (var key in Locations) {
        $loc.append($('<option>', {
            value: key,
            text: key+". "+ Locations[key].Name
        }));
    }

    // Initialize
    UpdateScenarioView(Gloomhaven.data.ActiveTab);

});