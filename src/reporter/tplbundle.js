define([], function(){var _map = {};_map['./src/reporter/junit/templates/_error.tpl']= "<error {{data.get('message')}} {{data.get('type')}} >{{data.get('body',0)}}</error>";_map['./src/reporter/junit/templates/_failure.tpl']= "<failure {{data.get('message')}} {{data.get('type')}} >{{data.get('body',0)}}</failure>";_map['./src/reporter/junit/templates/_skipped.tpl']= "<skipped>{{data.get('body',0)}}</skipped>";_map['./src/reporter/junit/templates/_system.tpl']= "<system-{{data.systemtype}} >{{data.get('body',0)}}</system-{{data.systemtype}}>";_map['./src/reporter/junit/templates/_testcase.tpl']= "<testcase {{data.get('name')}} {{data.get('assertions')}} {{data.get('classname')}} {{data.get('status')}} {{data.get('time')}}>{{data.get('body',0)}}</testcase>";_map['./src/reporter/junit/templates/_testsuite.tpl']= "<testsuite {{data.get('id')}}  {{data.get('name')}}  {{data.get('disabled')}} {{data.get('errors')}}  {{data.get('failures')}}  {{data.get('hostname')}}  {{data.get('package')}} {{data.get('skipped')}} {{data.get('tests')}} {{data.get('time')}} {{data.get('timestamp')}} >{{data.get('body', 0)}}</testsuite>";_map['./src/reporter/junit/templates/_testsuites.tpl']= "<testsuites {{data.get('name')}} {{data.get('disabled')}} {{data.get('errors')}} {{data.get('failures')}}  {{data.get('tests')}}  {{data.get('time')}}  >{{data.get('body',0)}} </testsuites>";return _map;});