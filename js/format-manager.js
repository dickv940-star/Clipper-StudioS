const FormatManager = {


formats:[

"mp4",
"webm",
"mov"

],



getFormats(){


return this.formats;


},



validate(format){


return this.formats.includes(
format
);


}



};



window.FormatManager = FormatManager;


console.log(
"Format Manager Ready"
);
