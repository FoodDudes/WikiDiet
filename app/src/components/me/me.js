import template from './me.html';

export default {
    template,
    bindings: {
        myname: '<',
        userData: '<'
    },
    controller
};


function controller() {
    this.activityLevels = [
        {desc: 'None', value: 1},
        {desc: 'Average', value: 2},
        {desc: 'Active', value: 3},
        {desc: 'Very Active', value: 4}
    ];
    this.dietaryGuide = {};

    this.$onInit = () => {
        this.myData = this.userData[0];
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        this.myActivityLevel = this.activityLevels[1];
        this.dietaryGuide = this.makeGuide(this.myActivityLevel.value);
    };

    this.getEaten = () => {
        const storedEaten = this.myData.eaten;
        let displayEaten = [];
        if (storedEaten.length > 7) {
            displayEaten = storedEaten.slice(-7);
        } else {
            dispalyEaten = storedEaten.slice(0);
        }

        // calories
        let theChartTitle = 'Nutritional Info';
        let theChartData = [];
        displayEaten.forEach(function(element, idx, array ) {
            totCals.push(element.Calories || 0);
            totCarbs.push(element.Carbs || 0);
            totFats.push(element.totalFats || 0);
            totProtein.push(element.totalProtein || 0);
            theChartLabels.push(element.time || 'none');
        });
    };


    this.showChart = () => {

    };

    this.updateView = (newActivityLevel) => {
        this.dietaryGuide = this.makeGuide(newActivityLevel);
    };


   //AJ's formula will go here to calculate a person's daily calorie needs;
    this.makeGuide = (activityLevel) => {
        let age = this.myData.age;
        let height = this.myData.height;
        let weight = this.myData.weight;
        let gender = this.myData.gender;

        let bEE = 0;
        let metricWeight = (weight / 2.2);
        let metricHeight = (height * 2.54);
        let dietGuide = {};

        // Determine the Basal Energy Expenditure
        if (gender === 'male') {
            bEE = (66.5 + (13.8 * metricWeight) + (5.0 * metricHeight) - (6.8 * age));
        } else {
            bEE = (655.1 + (9.6 * metricWeight) + (1.9 * metricHeight) - (4.7 * age));
        };

        // Activity level, 0 = none, 1 = average, 3 = active, 4 = Very active
        if (activityLevel === 4) {
            bEE = bEE * 1.5;
        } else if (activityLevel === 3) {
            bEE = bEE * 1.25;
        } else if (activityLevel === 2) {
            bEE = bEE * 1.1;
        } else {
            bEE = bEE;
            // Get up and move
        };

        dietGuide.calories = bEE.toFixed(0);
        dietGuide.carbTarget = ((bEE * .5) / 4).toFixed(0); // 45% - 65% cals from carbs
        dietGuide.fatMax = ((bEE * .33) / 9).toFixed(0); // 1/3 cals from fats
        dietGuide.proteinTarget = (metricWeight * .9).toFixed(0); // .8 - 1.0 grams per kilo

        return dietGuide;
    }; 
   //also any custom nutrition informationconsole.log(this.currentUser);

}
