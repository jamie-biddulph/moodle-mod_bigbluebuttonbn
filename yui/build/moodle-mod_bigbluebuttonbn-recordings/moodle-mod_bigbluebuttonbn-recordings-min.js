YUI.add("moodle-mod_bigbluebuttonbn-recordings",function(e,t){M.mod_bigbluebuttonbn=M.mod_bigbluebuttonbn||{},M.mod_bigbluebuttonbn.recordings={datasource:null,locale:"en",profilefeatures:{},datatable:{},init:function(t){this.datasource=new e.DataSource.Get({source:M.cfg.wwwroot+"/mod/bigbluebuttonbn/bbb_broker.php?"}),this.locale=t.locale,this.profilefeatures=t.profile_features,t.recordings_html===!1&&(this.profilefeatures.includes("all")||this.profilefeatures.includes("showrecordings"))&&(this.datatable.columns=t.columns,this.datatable.data=this.datatable_init_format_dates(t.data),this.datatable_init())},datatable_init_format_dates:function(e){for(var t=0;t<e.length;t++){var n=new Date(e[t].date);e[t].date=n.toLocaleDateString(this.locale,{weekday:"long",year:"numeric",month:"long",day:"numeric"})}return e},datatable_init:function(){var e=this.datatable.columns,t=this.datatable.data;YUI({lang:this.locale}).use("datatable","datatable-sort","datatable-paginator","datatype-number",function(n){var r=(new n.DataTable({width:"1075px",columns:e,data:t,rowsPerPage:10,paginatorLocation:["header","footer"]})).render("#bigbluebuttonbn_yui_table");return r})},recording_element_payload:function(t){var n=e.one(t),r=n.ancestor("div");return{action:n.getAttribute("data-action"),recordingid:r.getAttribute("data-recordingid"),meetingid:r.getAttribute("data-meetingid")}},recording_action:function(e,t,n){var r=this.recording_element_payload(e);r=Object.assign(r,n);if(!t){this.recording_action_perform(r);return}var i=new M.core.confirm({modal:!0,centered:!0,question:this.recording_confirmation_message(r.action,r.recordingid)});i.on("complete-yes",function(){this.recording_action_perform(r)},this)},recording_action_perform:function(e){M.mod_bigbluebuttonbn.helpers.toggle_spinning_wheel_on(e),M.mod_bigbluebuttonbn.broker.recording_action_perform(e)},recording_publish:function(e){var t={source:"published",goalstate:"true"};this.recording_action(e,!1,t)},recording_unpublish:function(e){var t={source:"published",goalstate:"false"};this.recording_action(e,!1,t)},recording_protect:function(e){var t={source:"protected",goalstate:"true"};this.recording_action(e,!1,t)},recording_unprotect:function(e){var t={source:"protected",goalstate:"false"};this.recording_action(e,!1,t)},recording_delete:function(e){var t={source:"status",goalstate:!1};this.recording_action(e,!0,t)},recording_import:function(e){var t={};this.recording_action(e,!0,t)},recording_update:function(t){var n=e.one(t),r=n.ancestor("div"),i={target:r.getAttribute("data-target"),source:r.getAttribute("data-source"),goalstate:n.getAttribute("data-goalstate")};this.recording_action(t,!1,i)},recording_edit:function(t){var n=e.one(t),r=n.ancestor("div"),i=r.one("> span");i.hide(),n.hide();var s=e.Node.create('<input type="text" class="form-control"></input>');s.setAttribute("id",n.getAttribute("id")),s.setAttribute("value",i.getHTML()),s.setAttribute("data-value",i.getHTML()),s.setAttribute("onkeydown","M.mod_bigbluebuttonbn.recordings.recording_edit_keydown(this);"),s.setAttribute("onfocusout","M.mod_bigbluebuttonbn.recordings.recording_edit_onfocusout(this);"),r.append(s)},recording_edit_keydown:function(e){if(event.keyCode==13){this.recording_edit_perform(e);return}event.keyCode==27&&this.recording_edit_onfocusout(e)},recording_edit_onfocusout:function(t){var n=e.one(t),r=n.ancestor("div");n.hide(),r.one("> span").show(),r.one("> a").show()},recording_edit_perform:function(t){var n=e.one(t),r=n.ancestor("div"),i=t.value;n.setAttribute("data-action","edit"),n.setAttribute("data-goalstate",i),M.mod_bigbluebuttonbn.recordings.recording_update(n.getDOMNode()),r.one("> span").setHTML(i);var s=r.one("> a");s.show(),s.focus()},recording_edit_completion:function(t,n){var r=M.mod_bigbluebuttonbn.helpers.element_id(t.action,t.target),i=e.one("a#"+r+"-"+t.recordingid),s=i.ancestor("div"),o=s.one("> span");if(typeof o=="undefined")return;var u=s.one("> input");n&&o.setHTML(u.getAttribute("data-value")),u.remove()},recording_play:function(t){var n=e.one(t);window.open(n.getAttribute("data-href"))},recording_confirmation_message:function(t){var n,r,i,s,o;return n=M.util.get_string("view_recording_"+t.action+"_confirmation","bigbluebuttonbn"),typeof n=="undefined"?"":(r=M.util.get_string("view_recording","bigbluebuttonbn"),e.one("#playbacks-"+t.recordingid).get("dataset").imported==="true"&&(r=M.util.get_string("view_recording_link","bigbluebuttonbn")),n=n.replace("{$a}",r),t.action==="import"?n:(i=M.mod_bigbluebuttonbn.helpers.element_id(t.action,t.target),s=e.one("a#"+i+"-"+t.recordingid).get("dataset").links,s===0?n:(o=M.util.get_string("view_recording_"+t.action+"_confirmation_warning_p","bigbluebuttonbn"),s==1&&(o=M.util.get_string("view_recording_"+t.action+"_confirmation_warning_s","bigbluebuttonbn")),o=o.replace("{$a}",s)+". ",o+"\n\n"+n)))},recording_action_completion:function(t){if(t.action=="play"){window.open(t.href);return}if(t.action=="delete"||t.action=="import"){e.one("#recording-td-"+t.recordingid).remove();return}M.mod_bigbluebuttonbn.helpers.update_data(t),M.mod_bigbluebuttonbn.helpers.toggle_spinning_wheel_off(t),M.mod_bigbluebuttonbn.helpers.update_id(t),(t.action==="publish"||t.action==="unpublish")&&this.recording_publishunpublish_completion(t)},recording_action_failover:function(e){var t=new M.core.alert({title:M.util.get_string("error","moodle"),message:e.message});t.show(),M.mod_bigbluebuttonbn.helpers.toggle_spinning_wheel_off(e),e.action==="edit"&&this.recording_edit_completion(e,!0)},recording_publishunpublish_completion:function(t){var n,r;n=e.one("#playbacks-"+t.recordingid),r=e.one("#preview-"+t.recordingid);if(t.action=="unpublish"){n.hide(),r.hide();return}n.show(),r.show(),M.mod_bigbluebuttonbn.helpers.reload_preview(t)}},M.mod_bigbluebuttonbn=M.mod_bigbluebuttonbn||{},M.mod_bigbluebuttonbn.helpers={toggle_spinning_wheel_on:function(t){var n,r,i,s;n=this.element_id(t.action,t.target),s=M.util.get_string("view_recording_list_action_"+t.action
,"bigbluebuttonbn"),r=e.one("a#"+n+"-"+t.recordingid),r.setAttribute("data-onclick",r.getAttribute("onclick")),r.setAttribute("onclick",""),i=r.one("> i");if(i===null){this.toggle_spinning_wheel_on_compatible(r.one("> img"),s);return}i.setAttribute("data-aria-label",i.getAttribute("aria-label")),i.setAttribute("aria-label",s),i.setAttribute("data-title",i.getAttribute("title")),i.setAttribute("title",s),i.setAttribute("data-class",i.getAttribute("class")),i.setAttribute("class",this.element_fa_class("process"))},toggle_spinning_wheel_on_compatible:function(e,t){e.setAttribute("data-alt",e.getAttribute("alt")),e.setAttribute("alt",t),e.setAttribute("data-title",e.getAttribute("title")),e.setAttribute("title",t),e.setAttribute("data-src",e.getAttribute("src")),e.setAttribute("src",M.cfg.wwwroot+"/mod/bigbluebuttonbn/pix/processing16.gif")},toggle_spinning_wheel_off:function(t){var n,r,i;n=this.element_id(t.action,t.target),r=e.one("a#"+n+"-"+t.recordingid),r.setAttribute("onclick",r.getAttribute("data-onclick")),r.removeAttribute("data-onclick"),i=r.one("> i");if(i===null){this.toggle_spinning_wheel_off_compatible(r.one("> img"));return}i.setAttribute("aria-label",i.getAttribute("data-aria-label")),i.removeAttribute("data-aria-label"),i.setAttribute("title",i.getAttribute("data-title")),i.removeAttribute("data-title"),i.setAttribute("class",i.getAttribute("data-class")),i.removeAttribute("data-class")},toggle_spinning_wheel_off_compatible:function(e){e.setAttribute("alt",e.getAttribute("data-alt")),e.removeAttribute("data-alt"),e.setAttribute("title",e.getAttribute("data-title")),e.removeAttribute("data-title"),e.setAttribute("src",e.getAttribute("data-src")),e.removeAttribute("data-src")},update_data:function(t){var n,r,i,s,o,u,a;n=this.element_action_reversed(t.action);if(n===t.action)return;r=this.element_id(t.action,t.target),i=e.one("a#"+r+"-"+t.recordingid),i.setAttribute("data-action",n),s=i.getAttribute("data-onclick").replace(t.action,n),i.setAttribute("data-onclick",s),u=M.util.get_string("view_recording_list_actionbar_"+n,"bigbluebuttonbn"),a=this.element_tag(n),o=i.one("> i");if(o===null){this.update_data_compatible(i.one("> img"),this.element_tag(t.action),a,u);return}o.setAttribute("data-aria-label",u),o.setAttribute("data-title",u),o.setAttribute("data-class",this.element_fa_class(n))},update_data_compatible:function(e,t,n,r){var i;i=e.getAttribute("data-src").replace(t,n),e.setAttribute("data-alt",r),e.setAttribute("data-title",r),e.setAttribute("data-src",i)},update_id:function(t){var n,r,i,s,o;n=this.element_action_reversed(t.action);if(n===t.action)return;r=this.element_id(t.action,t.target),i=e.one("a#"+r+"-"+t.recordingid),o=""+r.replace(t.action,n)+"-"+t.recordingid,i.setAttribute("id",o),s=i.one("> i"),s===null&&(s=i.one("> img")),s.setAttribute("id",o)},element_id:function(e,t){var n="recording-"+e;return typeof t!="undefined"&&(n+="-"+t),n},element_tag:function(e){var t={};return t.publish="show",t.unpublish="hide",t.protect="lock",t.unprotect="unlock",t.edit="edit",t.process="process",t["import"]="import",t["delete"]="delete",t[e]},element_fa_class:function(e){var t={};return t.publish="fa-eye fa-fw",t.unpublish="fa-eye-slash fa-fw",t.protect="fa-lock fa-fw",t.unprotect="fa-unlock fa-fw",t.edit="fa-pencil fa-fw",t.process="fa-spinner fa-spin",t["import"]="fa-download fa-fw",t["delete"]="fa-trash fa-fw","icon fa "+t[e]+" iconsmall"},element_action_reversed:function(e){var t={};return t.publish="unpublish",t.unpublish="publish",t.protect="unprotect",t.unprotect="protect",t.edit="edit",t["import"]="import",t["delete"]="delete",t[e]},reload_preview:function(t){var n=e.one("#preview-"+t.recordingid).all("> img");n.each(function(e){var t=e.getAttribute("src");t=t.substring(0,t.indexOf("?")),t+="?"+(new Date).getTime(),e.setAttribute("src",t)})}}},"@VERSION@",{requires:["base","node","datasource-get","datasource-jsonschema","datasource-polling","moodle-core-notification"]});
