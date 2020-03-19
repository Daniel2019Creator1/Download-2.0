            console.log("A WORKING DOWNLOAD");
            console.log("A WORKING DOWNLOAD");
            var number = 100;
            var range;
            var directionArray = [0,1]; // 0 being add, 1 being subtract

            var lineZero = document.getElementById("lineZero"); // "Downloading.." (top left side)
            var lineOne = document.getElementById("lineOne"); // "x%" (top right side)
            var lineTwo = document.getElementById("lineTwo"); // "yMB/xMB" (bottom left side)
            var lineThree = document.getElementById("lineThree"); // "x/sec" (bottom middle)
            var lineFour = document.getElementById("lineFour"); // "x mins y secs" (bottom right side)

            var testArray;
            var testArray2;
            var testArray3;
            var byteSymbol; // variable for the symbol of data (in kb, mb, etc)
            var displayNumber; //placeholder variable to display the current download speed
            var displayProgressValue; //placeholder variable to display the current progress shown on the progress bar
            var displayProgressMax; // placeholder variable to display the max value of the progress bar
            var timeLeft; // variable to calculate the time left on the download

            var tempNumber;

            var progressBar = document.getElementById("progressBar");

            var anInterval; // variable for the interval so we can activate and stop it when we please

            var buttonClass = document.getElementsByClassName("buttonClass"); //grouping class for the buttons

            function interval(){

                anInterval = setInterval(
                        function(){

                            prevNumber();

                            range = (Math.floor(Math.random()*50)+1); // Random range between 1 and 50 inclusive
                            direction = Math.floor(Math.random()*directionArray.length);
                            if(direction == 0 || number < 50 || previousNumber < 50){ //positive
                                number = previousNumber + range;
                            } else if (direction == 1){ // negative
                                number = previousNumber - range;
                            }
                            progressBar.value = progressBar.value + number;
                            timeLeft = Math.round((progressBar.max-progressBar.value)/(60*number)) + " mins " + Math.round((((progressBar.max-progressBar.value)/(60*number))%1)*60,4) + " secs";
                            byteSize();
                            displayNumber = testArray2[0];
                            displayProgressValue = testArray2[1];
                            displayProgressMax = testArray2[2];

                            //lineThree.innerHTML = "File Size: " +  displayProgressMax;

                            if (progressBar.value >= progressBar.max){
                                lineTwo.innerHTML = displayProgressValue + "/" + displayProgressValue + " " + Math.round((progressBar.value/progressBar.max)*100) + "%";
                                lineFour.innerHTML = "";

                                buttonClass[1].style.display = "none";
                                buttonClass[3].style.display = "none";

                                lineZero.style.visibility = "visible";
                                lineTwo.style.visibility = "hidden";
                                lineThree.style.visibility = "hidden";
                                lineFour.style.visibility = "hidden";
                                lineOne.style.visibility = "hidden";

                                lineZero.innerHTML = "Your download has finished.";
                                clearInterval(anInterval);

                                return;
                            } else {
                                lineZero.innerHTML = "Downloading...";
                                lineOne.innerHTML = Math.round((progressBar.value/progressBar.max)*100) + "%";
                                lineTwo.innerHTML = displayProgressValue+"/"+displayProgressMax;
                                lineThree.innerHTML = displayNumber;
                                lineFour.innerHTML = timeLeft;
                            }
                        }, 1000);
            }

            function download(){

                buttonClass[0].style.display = "none";
                buttonClass[1].style.display = "inline";
                buttonClass[3].style.display = "inline";
                buttonClass[4].style.display = "none";

                lineZero.style.visibility = "visible";
                lineOne.style.visibility = "visible";
                lineTwo.style.visibility = "visible";
                lineThree.style.visibility = "visible";
                lineFour.style.visibility = "visible";
                
                interval();

            function move() {
                if (value >= 100) {
                alert("Successfuly Downloaded!!");
                value = 0;
                clearInterval(time);
                }
                else {
                value += 1;
                bar.value = value;
                percentage.innerText = value;
                }
            }}
            
            function stop(){

                buttonClass[1].style.display = "none";
                buttonClass[2].style.display = "none";
                buttonClass[3].style.display = "none";
                buttonClass[4].style.display = "inline";

                lineZero.style.visibility = "visible";
                lineOne.style.visibility = "hidden";
                lineTwo.style.visibility = "hidden";
                lineThree.style.visibility = "hidden";
                lineFour.style.visibility = "hidden";

                clearInterval(anInterval);
                lineZero.innerHTML = "The Download has been stopped";
            }

            function resume(){
                buttonClass[2].style.display = "none";
                buttonClass[3].style.display = "inline";

                lineZero.style.visibility = "visible";
                lineOne.style.visibility = "visible";
                lineTwo.style.visibility = "visible";
                lineThree.style.visibility = "visible";
                lineFour.style.visibility = "visible";
                lineZero.innerHTML = "Downloading...";

                interval();
            }

            function pause(){
                buttonClass[3].style.display = "none";
                buttonClass[2].style.display = "inline";

                lineZero.style.visibility = "visible";
                lineOne.style.visibility = "visible";
                lineTwo.style.visibility = "hidden";
                lineThree.style.visibility = "hidden";
                lineFour.style.visibility = "hidden";
                

                clearInterval(anInterval);
                lineZero.innerHTML = "The Download has been paused";
            }

            function prevNumber(){
                previousNumber = number;
            }

            function byteSize(){
                testArray = [number,progressBar.value,progressBar.max];
                testArray2 = [displayNumber,displayProgressValue,displayProgressMax];
                testArray3 = ["/Sec","",""];

                for(var i=0;i<3;i++){
                    if(testArray[i] < 1024){
                        byteSymbol = "KB"+testArray3[i];
                        testArray2[i] = testArray[i] + " " + byteSymbol;
                    } else if (testArray[i] >= 1024 && testArray[i] < (1024*1024)){
                        byteSymbol = "MB"+testArray3[i];
                        testArray2[i] = Math.round((testArray[i]/1024)*100)/100 + " " + byteSymbol;
                    } else if (testArray[i] >= (1024*1024)){
                        byteSymbol = "GB"+testArray3[i];
                        testArray2[i] = Math.round((testArray[i]/(1024*1024))*100)/100 + " " + byteSymbol;
                    } else {
                        byteSymbol = "B/S";
                    }

                }

            }

            /*
                https://css-tricks.com/html5-progress-element/
            */
