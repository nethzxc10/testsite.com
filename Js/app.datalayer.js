 var currentUrl = window.location.pathname.replace('/', '');
 var currentUrlArr = currentUrl.split("/");
 var currentCategory = $('.peronalbussiness.nav.navbar-nav .peronalbussinesslink.active').length ? $('.peronalbussiness.nav.navbar-nav .peronalbussinesslink.active')[0].text : 'Personal';
 var userAgent = navigator.userAgent;
 var label = '';

 function PushtoDataLayerGtmObject(selectedData) {
     var dataLayerData = {
         'event': 'hm_push_event',
         'user_type': userContext.CustomerStatus ? userContext.CustomerStatus : 'not set',
         'user_id': userContext.CustomerId ? userContext.CustomerId : 'not set',
         'loggedin_status': userContext.IsLoggedIn ? 'YES' : 'NO',
         'website_section_name': currentCategory,
         'user_agent': userAgent,
         'environment': 'Production'
     };
     var gtmtags = Object.assign(dataLayerData, selectedData);
     window.dataLayer = window.dataLayer || [];
     window.dataLayer.push(gtmtags);
     console.log(gtmtags);
 };

 $(document).ready(function() {

     setTimeout(function() {
         $('.navHeaderLinksCenetr li a').on('click touchstart', function(e) {
             var dataLayerItem = {};
             label = 'Type=';
             var nodeArry = [];

             var parentNode = $(this).parents('li');
             for (var count = 0; count < parentNode.length; count++) {
                 var anode = parentNode[count];
                 nodeArry.push((anode.firstElementChild.innerHTML).replace(/\s/g, ''));
             }
             var reverseNodeArr = nodeArry.reverse();
             var stringLbl = e.currentTarget.getAttribute('data-nav').replace(/\s/g, '');
             var label = label + stringLbl;

             dataLayerItem.event_category = 'Personal-Core';
             dataLayerItem.event_label = label;
             dataLayerItem.event_action = 'Navigation';
             dataLayerItem.menu_l1 = reverseNodeArr[0] ? reverseNodeArr[0] : 'NA';
             dataLayerItem.menu_l2 = reverseNodeArr[1] ? reverseNodeArr[1] : 'NA';
             dataLayerItem.product_name = reverseNodeArr[2] ? reverseNodeArr[2] : 'NA';
             PushtoDataLayerGtmObject(dataLayerItem)

         });
         $('.peronalbussiness.nav.navbar-nav .peronalbussinesslink').on('click touchstart', function(e) {
             var dataLayerItem = {};
             label = 'Type=';
             label = label + $(this).text();
             dataLayerItem.event_category = 'Personal-Core';
             dataLayerItem.event_label = label;
             dataLayerItem.event_action = 'Navigation';
             PushtoDataLayerGtmObject(dataLayerItem);
         });
         $('.footer.m1 .footer-social a.footer-social-links').on('click touchstart', function(e) {
             var dataLayerItem = {};
             label = '';
             var footerlbl = 'Footer-Social-';
             label = footerlbl + e.target.getAttribute('alt');
             dataLayerItem.event_category = 'Personal-Engagement';
             dataLayerItem.event_label = label;
             dataLayerItem.event_action = 'Click';
             dataLayerItem.ui_section_name = 'Footer';
             dataLayerItem.ui_element_name = 'Social';
             dataLayerItem.click_text = e.target.getAttribute('alt');
             PushtoDataLayerGtmObject(dataLayerItem)
         });
         $('.footer.m1 .footer-navigationLinks').on('click touchstart', function(e) {
             var dataLayerItem = {};
             label = '';
             var stringLbl = e.currentTarget.getAttribute('data-nav').replace(/\s/g, '');
             label = label + stringLbl;
             var elmname = label.split("-");
             dataLayerItem.event_category = 'Personal-Engagement';
             dataLayerItem.event_label = label;
             dataLayerItem.event_action = 'Click';
             dataLayerItem.ui_section_name = 'Footer';
             dataLayerItem.ui_element_name = elmname[1] ? elmname[1] : 'NA';
             dataLayerItem.click_text = e.currentTarget.text.replace(/\s/g, '');
             PushtoDataLayerGtmObject(dataLayerItem)
         });

     }, 1000)
 });