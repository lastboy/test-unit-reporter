<junitreport todir="{{reportsdir}}">
    <fileset dir="{{testsdir}}">
        <include name="*Test.xml"/>
    </fileset>
    <report format="frames" todir="{{reportsdir}}/html"/>
</junitreport>