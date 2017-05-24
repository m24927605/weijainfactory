const express = require('express');
const router = express.Router();
//引用 nodemailer
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./index', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
  res.render('./index', { title: 'Express' });
});


router.get('/about', function(req, res, next) {
  res.render('./about', { title: 'Express' });
});

router.get('/machines', function(req, res, next) {
  res.render('./machines', { title: 'Express' });
});

router.get('/news', function(req, res, next) {
  res.render('./news', { title: 'Express' });
});

router.get('/search', function(req, res, next) {
  res.render('./search', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('./contact', { title: 'Express' });
});
router.post('/contact',function(req,res,next){
	let name=req.body.Name;
	let phone=req.body.Phone;
	let cellphone=req.body.CellPhone;
	let email=req.body.Email;
	let company_name=req.body.CompanyName;
	let message=req.body.Message;
	console.log(req.body);
	//宣告發信物件
	let transporter = nodemailer.createTransport(smtpTransport({
		service: 'gmail',
		tls: { rejectUnauthorized: false },
		auth: {
		    user: 'weijianfactory@gmail.com',
		    pass: '23322581',

		}
	}));

	let options = {
	    //寄件者
	    from: 'weijianfactory@gmail.com',
	    //收件者
	    to: 'weijianfactory@hotmail.com', 
	    //副本
	    cc: '',
	    //密件副本
	    bcc: '',
	    //主旨
	    subject: `${name} 發問來自官網`, // Subject line
	    //嵌入 html 的內文
	    html: `	<h1>姓名:${name}<h1>
	    		<h1>市話:${phone}<h1>
	    		<h1>手機:${cellphone}<h1>
	    		<h1>信箱:${email}<h1>
	    		<h1>公司名稱:${company_name}<h1>
	    		<textarea>內文:${message}</textarea>` 

	};

	//發送信件方法
	transporter.sendMail(options, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	        console.log('訊息發送: ' + info.response);
	    }
	});
});

module.exports = router;
