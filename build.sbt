name := "support-frontend"

version := "1.0-SNAPSHOT"

packageSummary := "Support Play APP"

scalaVersion := "2.11.8"

def env(key: String, default: String): String = Option(System.getenv(key)).getOrElse(default)

lazy val testScalastyle = taskKey[Unit]("testScalastyle")

lazy val root = (project in file(".")).enablePlugins(PlayScala, BuildInfoPlugin, RiffRaffArtifact, JDebPackaging).settings(
  buildInfoKeys := Seq[BuildInfoKey](
    name,
    BuildInfoKey.constant("buildNumber", env("BUILD_NUMBER", "DEV")),
    BuildInfoKey.constant("buildTime", System.currentTimeMillis),
    BuildInfoKey.constant("gitCommitId", Option(System.getenv("BUILD_VCS_NUMBER")) getOrElse(try {
      "git rev-parse HEAD".!!.trim
    } catch {
      case e: Exception => "unknown"
    }))
  ),
  buildInfoPackage := "app",
  buildInfoOptions += BuildInfoOption.ToMap,
  scalastyleFailOnError := true,
  testScalastyle := org.scalastyle.sbt.ScalastylePlugin.scalastyle.in(Compile).toTask("").value,
  (test in Test) := ((test in Test) dependsOn testScalastyle).value,
  (testOnly in Test) := ((testOnly in Test) dependsOn testScalastyle).evaluated,
  (testQuick in Test) := ((testQuick in Test) dependsOn testScalastyle).evaluated
)

libraryDependencies ++= Seq(
  "org.scalatestplus.play" %% "scalatestplus-play" % "2.0.0" % Test,
  "org.mockito" % "mockito-core" % "2.7.22" % Test,
  "com.getsentry.raven" % "raven-logback" % "8.0.3",
  "com.typesafe.scala-logging" % "scala-logging_2.11" % "3.4.0",
  "com.amazonaws" % "aws-java-sdk-stepfunctions" % "1.11.128",
  "com.typesafe.akka" %% "akka-agent" % "2.4.12",
  "org.typelevel" %% "cats" % "0.9.0"
)

sources in (Compile,doc) := Seq.empty

publishArtifact in (Compile, packageDoc) := false

import com.typesafe.sbt.packager.archetypes.ServerLoader.Systemd

serverLoading in Debian := Systemd

debianPackageDependencies := Seq("openjdk-8-jre-headless")

packageSummary := "Support Frontend Play App"
packageDescription := """Frontend for the new supporter platform"""
maintainer := "Membership <membership.dev@theguardian.com>"

riffRaffPackageType := (packageBin in Debian).value
riffRaffManifestProjectName := s"support:${name.value}"
riffRaffUploadArtifactBucket := Option("riffraff-artifact")
riffRaffUploadManifestBucket := Option("riffraff-builds")
riffRaffArtifactResources += (file("cloud-formation/cfn.yaml"), "cfn/cfn.yaml")

javaOptions in Universal ++= Seq(
  "-Dpidfile.path=/dev/null",
  "-J-XX:MaxRAMFraction=2",
  "-J-XX:InitialRAMFraction=2",
  "-J-XX:MaxMetaspaceSize=500m",
  "-J-XX:+PrintGCDetails",
  "-J-XX:+PrintGCDateStamps",
  s"-J-Xloggc:/var/log/${packageName.value}/gc.log"
)

import com.typesafe.sbt.SbtScalariform.ScalariformKeys
import scalariform.formatter.preferences.SpacesAroundMultiImports

ScalariformKeys.preferences := ScalariformKeys.preferences.value
  .setPreference(SpacesAroundMultiImports, false)

excludeFilter in scalariformFormat := (excludeFilter in scalariformFormat).value ||
  "Routes.scala" ||
  "ReverseRoutes.scala" ||
  "JavaScriptReverseRoutes.scala" ||
  "RoutesPrefix.scala"

addCommandAlias("devrun", "run 9110") // Chosen to not clash with other Guardian projects - we can't all use the Play default of 9000!