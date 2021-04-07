<%@page pageEncoding="utf-8"%>

<% response.setContentType("text/html; charset=UTF-8");
	        response.setCharacterEncoding("UTF-8");%>
<!doctype html>
<html dir="rtl">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="bootstrap/bootstrap.min.css">
      <link rel="stylesheet" href="bootstrap/bootstrap-grid.min.css">
     
      <link rel="stylesheet" href="style.css">
<title>استبيان العميل</title>

</head>
<body>
      
    <div class="container">
        <div class="row heading-div">
            <div class="col-sm-12">
              <h4 class="heading">تقييم الخدمات المقدمة من قبل خدمة عملاء شركة توصيل الغاز الطبيعي</h4>
            </div>
      	</div>
      	<form action="FeedbackSvlt" accept-charset="UTF-8" method="post">
      	<div class="row divs">
            <div class="col-sm-12">
              
              	<div class="row mb-3">
				    <label class="labels" for="Time" class="col-xs-12 col-md-6 col-form-label">الوقت الذي استغرق في إنجاز الخدمة</label>
				    <div class="col-xs-12 col-md-6">
				      <select id="Time" name="Time" class="form-select form-select-sm">
						  <option value="4">راضي</option>
						  <option value="3">راضي إلى حد ما</option>
						  <option value="2">غير راضي إلى حد ما</option>
						  <option value="1">غير راضي</option>
						</select>
				    </div>
				  </div>
				  <!--  -->
				<div class="row mb-3">
				    <label class="labels" for="Clear_data" class="col-xs-12 col-md-6 col-form-label">وضوح نموذج الطلب وسهولة الحصول عليه</label>
				    <div class="col-xs-12 col-md-6">
				      <select id="Clear_data" name="Clear_data" class="form-select form-select-sm">
						  <option value="4">راضي</option>
						  <option value="3">راضي إلى حد ما</option>
						  <option value="2">غير راضي إلى حد ما</option>
						  <option value="1">غير راضي</option>
						</select>
				    </div>
				  </div>
				  <!--  -->
				  <div class="row mb-3">
				    <label class="labels" for="Employee" class="col-xs-12 col-md-6 col-form-label">كفاءة الموظف وأسلوب تعامله وقدرته على إجابة التساؤلات</label>
				    <div class="col-xs-12 col-md-6">
				      <select id="Employee" name="Employee" class="form-select form-select-sm">
						  <option value="4">راضي</option>
						  <option value="3">راضي إلى حد ما</option>
						  <option value="2">غير راضي إلى حد ما</option>
						  <option value="1">غير راضي</option>
						</select>
				    </div>
				  </div>
				  <!--  -->
				  <div class="row mb-3">
				    <label class="labels" for="Quality" class="col-xs-12 col-md-6 col-form-label">جودة ودقة الخدمة المقدمة</label>
				    <div class="col-xs-12 col-md-6">
				      <select id="Quality" name="Quality" class="form-select form-select-sm">
						  <option value="4">راضي</option>
						  <option value="3">راضي إلى حد ما</option>
						  <option value="2">غير راضي إلى حد ما</option>
						  <option value="1">غير راضي</option>
						</select>
				    </div>
				  </div>
				  <!--  -->
				  <div class="row mb-3">
				    <label class="labels" for="Technical" class="col-xs-12 col-md-6 col-form-label">المستوى الفني في تقديم الخدمة وتحقيق المطلوب</label>
				    <div class="col-xs-12 col-md-6">
				      <select id="Technical" name="Technical" class="form-select form-select-sm">
						  <option value="4">راضي</option>
						  <option value="3">راضي إلى حد ما</option>
						  <option value="2">غير راضي إلى حد ما</option>
						  <option value="1">غير راضي</option>
						</select>
				    </div>
				  </div>
				  <!--  -->
				  <div class="row mb-3">
				    <label class="labels" for="Ease" class="col-xs-12 col-md-6 col-form-label">سهولة التعامل مع الإجراءات للحصول على الخدمة</label>
				    <div class="col-xs-12 col-md-6">
				      <select id="Ease" name="Ease" class="form-select form-select-sm">
						  <option value="4">راضي</option>
						  <option value="3">راضي إلى حد ما</option>
						  <option value="2">غير راضي إلى حد ما</option>
						  <option value="1">غير راضي</option>
						</select>
				    </div>
				  </div>
				  <!--  -->
            </div>
      	</div>
      	<div class="row footer-div">
            <div class="col-sm-12">
              <div class="mb-3 heading">
				  <label class="labels" for="Comment">اقتراحات وملاحظات أخرى</label>
				  <textarea class="form-control" id="Comment" name="Comment" rows="5"> </textarea>
				</div>
            </div>
      	</div>
      	<div class="row divs">
            <div class="col-sm-12">
              <div class="d-grid gap-2 col-6 mx-auto">
				  <button class="btn btn-primary mybtn" type="submit">ارسل</button>
				  <!-- input type="submit" value="ارسل"> -->
				</div>
            </div>
      	</div>
      	<input id="id" name="id" type="hidden" value="" />
      	</form>
      </div>
      <script src="bootstrap/jquery-3.6.0.min.js"></script>
    <!-- script src="bootstrap/popper.min.js"></script-->
    <script src="bootstrap/bootstrap.bundle.min.js"></script>
</body>
<script>
      /*const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		var id = ""
		if (urlParams.has('id')) {
			id = urlParams.get('id')
			// console.log(LDC);
		}*/
		var url = new URL(window.location.href);
		//var id = url.searchParams.get("id");
		var id = getQueryString('id');
		
		console.log('id');
		console.log(id);
		//set hidden parameter
      	document.getElementById('id').value = id;
      	console.log("id2");
      	console.log(document.getElementById("id").value);
		
      	function getQueryString() {
            var key = false, res = {}, itm = null;
            // get the query string without the ?
            var qs = location.search.substring(1);
            // check for the key as an argument
            if (arguments.length > 0 && arguments[0].length > 1)
              key = arguments[0];
            // make a regex pattern to grab key/value
            var pattern = /([^&=]+)=([^&]*)/g;
            // loop the items in the query string, either
            // find a match to the argument, or build an object
            // with key/value pairs
            while (itm = pattern.exec(qs)) {
              if (key !== false && decodeURIComponent(itm[1]) === key)
                return decodeURIComponent(itm[2]);
              else if (key === false)
                res[decodeURIComponent(itm[1])] = decodeURIComponent(itm[2]);
            }

            return key === false ? res : null;
  }
      </script>
</html>