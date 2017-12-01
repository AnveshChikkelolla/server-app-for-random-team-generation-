let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let fs = require('fs');
app.use(bodyParser());
fs.appendFile('loginDetails.txt'," File accessed at " + new Date(),function(err){
  if(err) throw err;});
app.get('/',function(req,res)

{
    res.sendFile('index.html',{root: './'});
});
//write("\r\nFile accessed at " + new Date() + "\r\n");
app.post('/', function (req, resp) {
 
   let input_file=req.body.path;
   let no_of_teams=req.body.no_of_teams;
 
   fs.exists(input_file, function(exists) {                                  //it checks for  given json file exist or not
     console.log("file exists ? " + exists);
   if(exists==true)
    {     
     if(no_of_teams>0)
        {	 

       fs.readFile(input_file, 'utf8', function (err,data) {                  // here we are reading a file 
        if (err) {
        return console.log(err);}
        //console.log(data);
        let parsed = JSON.parse(data);
        let student_data = [];
        for(let x in parsed.students){
        student_data.push(parsed.students[x]); }
        let shuffle = require('shuffle-array');
        shuffle(student_data);
      console.log(student_data);
        let i=0;
        let count=0;
        while(student_data[i++]!=null){                                      //it finds the number of students in a given json file 
      count++;
      }
        console.log("no of students in given file are "+count);
        let total_students=count;
        let min_studentsofeachteam=parseInt(total_students/no_of_teams);
        if(min_studentsofeachteam!=0)                                        //it checks for number of teams exceeded the number of students
      {                                    
              let exta_members=total_students%no_of_teams;  
              let z=0;
              let team_no=1;
             let sizeofteam=1;
              let temp=0;
            fs.writeFile('output.txt',"team no:"+team_no+"\n",function(err){                     //if it is a first time , open a file in wirte mode otherwise open in append mode  to keep update a outfile    
              if(err) throw err;});
            team_no++;
            while (z<total_students)                                        //it runs upto number of  students written into output file  
                    {               
                          if(sizeofteam<=min_studentsofeachteam){
                  fs.appendFile('output.txt', JSON.stringify(student_data[z])+"\n",function(err){
                                   });
                    if(err) throw err;
                     z++;                                  //z is used to calculate how many members taken from Total Student
                             sizeofteam++;
                            }
                         else if(exta_members!=0){                      //'else if' loop used to add the extra members to each team.it adds only one member to some teams only 
                     fs.appendFile('output.txt',JSON.stringify(student_data[z])+"\n",function(err){
                                   if(err) throw err;
                                   });
                     z++;
                   exta_members--;
                           temp=exta_members;
                           exta_members=0;
                          }
                  else {
                             fs.appendFile('output.txt',"team no:"+team_no+"\n",function(err){
                                   if(err) throw err;
                                   });
                                 team_no++;
                          sizeofteam=1;
                          exta_members=temp;	  
                            }
       
      
       
                         }
                         resp.end("You successfully genereted teams");
                       //  console.log("You successfully genereted teams");
                         fs.appendFile('loginDetails.txt',"\t Output: You successfully genereted teams \n" ,function(err){
                          if(err) throw err;});
   
      }
      else{
          //console.log("\n we could not find because  number of teams exceeded the number of students ");
          resp.end(" we could not find because  number of teams exceeded the number of students ");
          fs.appendFile('loginDetails.txt',"\t Output: we could not find because  number of teams exceeded the number of students\n" ,function(err){
            if(err) throw err;});
     	}  
	});
     }
     else{
	     resp.end("!!!you entered invalid number Of teams!!!!!!!!");
          fs.appendFile('loginDetails.txt',"\t Output: !!!you entered invalid number Of teams!!!!!!!!\n" ,function(err){
          if(err) throw err;});
         }  
	 
    }
    else{
    // console.log("!!!!!Sorry ...WE COULD NOT FIND ENTERED FILE!!!!!!!!!");
						resp.end("!!!!!Sorry ...WE COULD NOT FIND ENTERED FILE!!!!!!!!!");
     fs.appendFile('loginDetails.txt',"\t Output: !!!!!Sorry ...WE COULD NOT FIND ENTERED FILE!!!!!!!!!\n" ,function(err){
      if(err) throw err;});
      }
   });
  
 });

//else{
	//resp.end("!!!you entered invalid number Of teams!!!!!!!!");
     //fs.appendFile('loginDetails.txt',"\t Output: !!!you entered invalid number Of teams!!!!!!!!\n" ,function(err){
      //if(err) throw err;});
//}  
	
 app.listen(8081, function () {
   
    console.log("Listening port 8081")
 });