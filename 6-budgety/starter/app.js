var budgetController = (function(){
        var Expense = function (id, description, value){
            this.id = id;
            this.description = description;
            this.value = value;
            this.percentage =-1;
        };
    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome>0){
            this.percentage = Math.round((this.value /totalIncome) *100);
        }else{this.percentage=-1;}
            
    };
    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };
        var Income = function (id, description, value){
            this.id = id;
            this.description = description;
            this.value = value;
        };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
            console.log(sum);
        });
        data.totals[type] = sum;
    };
    
        var data = {
          allItems :{
              exp:[],
              inc:[]
          },
          totals :{
              exp:0,
              inc:0
          },
         budget:0,
         percentage :-1
};
    
          return{
    
            addItem : function(type,desc,val){
              var newItem,ID;
              if(data.allItems[type].length>0){
                ID =data.allItems[type][data.allItems[type].length-1].id+1;
    
              }else{
                  ID =0;
              }
             
              if (type==='inc'){
                  newItem = new Income(ID,desc,val);
              }
              else if(type ==='exp'){
                  newItem = new Expense(ID,desc,val);
              }
              data.allItems[type].push(newItem);
    //console.log(newItem);
              return(newItem);
              
            },
    deleteItem: function(type, id) {
        var ids, index;
        
        // id = 6
        //data.allItems[type][id];
        // ids = [1 2 4  8]
        //index = 3
        
        ids = data.allItems[type].map(function(current) {
            return current.id;
        });

        index = ids.indexOf(id);

        if (index !== -1) {
            data.allItems[type].splice(index, 1);
        }
        
    },
            calculateBudget :function(){
                calculateTotal('exp');
                calculateTotal('inc');
                data.budget =data.totals.inc - data.totals.exp;
                if(data.totals.inc >0){
                  //  data.percentage = Math.round((data.totals.exp / data.totals.inc)* 100);
                    data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
                    console.log(data.percentage);
                }else {
                    data.percentage =-1;
                    console.log(data.percentage);
                }
                

            },
            calculatePercentages :function(){
                  data.allItems.exp.forEach(function(cur){
                      cur.calcPercentage(data.totals.inc);
                  });
            },
            getPercentages :function(){
                var allPerc = data.allItems.exp.map(function(cur){
                    return cur.getPercentage();
                });return allPerc;
            },

            getBudget : function(){
                return {
                    budget : data.budget,
                    totalInc :data.totals.inc,
                    totalExp :data.totals.exp,
                    percentage :data.percentage
                }
            },
            testing: function() {
                console.log(data);
            }
          };
    
        
    
    
    })();
    
    var UIController =  (function(){
        var DOMstrings ={
            inputType : '.add__type',
            inputDescription :'.add__description',
            inputValue:'.add__value',
            inputBtn :'.add__btn',
            incomeContainer : '.income__list',
            expensesContainer : '.expenses__list',
            budgetLabel :'.budget__value',
            incomeLabel:'.budget__income--value',
            expensesLabel:'.budget__expenses--value',
            percentageLabel :'.budget__expenses--percentage' ,
            container: '.container',
            expPercLabel: '.item__percentage',
            dateLabel :'.budget__title--month' 
        };
    var nodeList = function(list,callback){
        for(var i =0;i<list.length;i++){
            callback(list[i],i);
        }
      };

    return {
    
        getinput : function(){
            return{
    
                type : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
                
            };
                },
    displayPercentages:function(percentages){
       var fields = document.querySelectorAll(DOMstrings.expPercLabel);    
       nodeList(fields,function(current,index){
           if(percentages[index]>0){
            current.textContent = percentages[index]+ ' %';
           }else{
            current.textContent = '---';
           }
       });
    },

    displayMonth: function(){
        var now,year,month,months;
            now = new Date();
            months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            year = now.getFullYear();
            month = now.getMonth();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
    },
    formatNumber : function(num, type) {
        var numSplit, int, dec,type;
        /*
            + or - before number
            exactly 2 decimal points
            comma separating the thousands

            2310.4567 -> + 2,310.46
            2000 -> + 2,000.00
            */

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    },
    addListItem: function(obj, type) {
        var html, newHtml, element;
        // Create HTML string with placeholder text
        
        if (type === 'inc') {
            element = DOMstrings.incomeContainer;
            
            html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        } else if (type === 'exp') {
            element = DOMstrings.expensesContainer;
            
            html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        
    // console.log(html);
    var value = UIController.formatNumber(obj.value, type);
    console.log(value);
    newHtml = html.replace('%id%',obj.id);
    newHtml = newHtml.replace('%description%',obj.description);
    newHtml = newHtml.replace('%value%', value);
    //console.log(element);
    document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
   //  console.log(newHtml);
    },

    displayBudget :function(obj){
        var type; 
        obj.budget > 0 ? type = 'inc' : type = 'exp';
        if(obj.budget!==0){
          
            document.querySelector(DOMstrings.budgetLabel).textContent = UIController.formatNumber(obj.budget, type);
        }
           else{
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
        }
            document.querySelector(DOMstrings.incomeLabel).textContent = UIController.formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = UIController.formatNumber(obj.totalExp, 'exp');
        
           if(obj.percentage>0){
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
       // console.log(obj.percentage);
        }else{
            document.querySelector(DOMstrings.percentageLabel).textContent = '---';
        }
    },
    deleteListItem :function(selectorId){
        var el = document.getElementById(selectorId);
        el.parentNode.removeChild(el);

    },
    clearFields: function(){
       var fields,fieldsArray;
       fields = document.querySelectorAll(DOMstrings.inputDescription+ ','+ DOMstrings.inputValue);
       fieldsArray = Array.prototype.slice.call(fields); 

       fieldsArray.forEach(function(current,index,array){
             current.value ="";

       });
       fieldsArray[0].focus();
    
    },
    changeType :function(){
        var fields = document.querySelectorAll(DOMstrings.inputType + ','+
        DOMstrings.inputDescription + ','+  DOMstrings.inputValue);
        nodeList(fields,function(cur){
             cur.classList.toggle('red-focus');
        });
        document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
    },
         getDOMstrings : function(){
    
            return DOMstrings;
         }       
    };
    
    })();
    
    
    var controller =  (function(budgetCtrl, UICtrl){
        var setEventListeners = function(){
            var DOM = UICtrl.getDOMstrings();
            document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);    
            document.addEventListener('keypress',function(event){
                if(event.keyCode===13 || event.which===13){
                    ctrlAddItem();
   
                }

                           });
    document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
    document.querySelector(DOM.inputType).addEventListener('change',UICtrl.changeType);
    };

var updateBudget = function(){
      budgetCtrl.calculateBudget();
      var budget = budgetCtrl.getBudget();
      UICtrl.displayBudget(budget); 

};
var updatePercentages = function(){
   budgetCtrl.calculatePercentages();
   var perc= budgetCtrl.getPercentages();
   // console.log(perc);
    UICtrl.displayPercentages(perc);
};
      
     var ctrlAddItem = (function(){
         var input,newItem;
         input = UICtrl.getinput();
   // console.log(input);
   // console.log('hi');
        if(input.description!== "" && !isNaN(input.value)&& input.value>0){
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            UICtrl.addListItem(newItem, input.type);
            UICtrl.clearFields();
            updateBudget();
            updatePercentages();
        }
           
        });
      var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
       // console.log(event);
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
       // console.log(itemID);
        if (itemID) {
            
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            console.log(splitID);
            
            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);
            
            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);
            
            // 3. Update and show the new budget
            updateBudget();
            
            // 4. Calculate and update percentages
            updatePercentages();
        }
    };
          
    
       return {
        init: function() {
            console.log('Application has started.');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
               budget: 0,
               totalInc: 0,
               totalExp: 0,
               percentage: -1
         });
            setEventListeners();
        }
    };
    
})(budgetController, UIController);


controller.init();