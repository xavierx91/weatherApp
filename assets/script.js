var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name')
var description = document.querySelector('.description')
var temperature = document.querySelector('.temperature')
// var history = $('.history'); 

button.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $('.oneDay').empty(); 
        oneDayForecast(inputValue.value)
   
});

$('.history').on('click', function (){
    $('.fiveDay').empty(); 
    let input  = $(this).text()
    oneDayForecast(input)
    fiveForecast(input)
})



function oneDayForecast(city) {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=a62333615945cd059c609c2e66c8f544')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        
            var nameValue = data['name'];
            var temperatureValue = data['main']['temp'];
            var descriptionValue = data['weather'][0]['description'];
          
            // name.innerHTML = nameValue;
            // temperature.innerHTML = temperatureValue;
            // description.innerHTML = descriptionValue;
            let temp = $(`<div>${temperatureValue}</div>`)
            let desp = $(`<div>${descriptionValue}</div>`)
            let name = $(`<div>${nameValue}</div>`)
            // tempDiv.text(temperatureValue)
            $('.oneDay').append(temp)
            $('.oneDay').append(desp)
            $('.oneDay').append(name)
        })
}
function fiveForecast(city) {
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=a62333615945cd059c609c2e66c8f544')
        .then(response => response.json())
        .then(data => {
            // var nameValue = data['name'];
            // var temperatureValue = data['main']['temp'];
            // var descriptionValue = data['weather'][0]['description'];
            // name.innerHtml = nameValue;
            // temperature.innerHTML = temperatureValue;
            // descripton.innerHTML = descriptionValue;
            console.log(data);

            for (let i = 0; i < data.list.length; i += 8) {
                let icon = 'http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png';
                console.log(icon);
                //http://openweathermap.org/img/wn/02d@2x.png
                let div = $(`  <div> ${data.list[i].main.temp}  ${i} </div> <br/>`)
                let imageDiv = $('<img>');
                imageDiv.attr('src', icon)
              
                


                $('.fiveDay').append(div);
                $('.fiveDay').append(imageDiv);
            }

            
        })
        
}



button.addEventListener('click', function () {
    oneDayForecast(inputValue.value)
    
});




// http://pro.openweathermap.org/data/2.5/forecast/hourly?q={city name}&appid=PUTYOURKEYHERE