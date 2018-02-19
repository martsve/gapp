var UpdateScenarioView = function() {
    $('#manual_scenario_start').toggleClass('d-none', Gloomhaven.data.ScenarioIsActive == true);
    $('#scenario_view').toggleClass('d-none', Gloomhaven.data.ScenarioIsActive != true);
    if (Gloomhaven.data.ScenarioIsActive) {
        var loc = Locations[Gloomhaven.data.ScenarioKey];
        var name = loc.Name;
        $('#scenario_view h2').text(name);
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
    
    // Initialize
    UpdateScenarioView(Gloomhaven.data.ActiveTab);

});