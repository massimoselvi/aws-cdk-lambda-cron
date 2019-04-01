"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("@aws-cdk/aws-events");
const lambda = require("@aws-cdk/aws-lambda");
const cdk = require("@aws-cdk/cdk");
const fs = require("fs");
class LambdaCronStack extends cdk.Stack {
    constructor(app, id) {
        super(app, id);
        const lambdaFn = new lambda.Function(this, "Singleton", {
            code: new lambda.InlineCode(fs.readFileSync("lambda-handler.js", { encoding: "utf-8" })),
            handler: "index.handler",
            timeout: 300,
            runtime: lambda.Runtime.Python27
        });
        // Run every day at 6PM UTC
        // See https://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html
        const rule = new events.EventRule(this, "Rule", {
            scheduleExpression: "cron(0 18 ? * MON-FRI *)"
        });
        rule.addTarget(lambdaFn);
    }
}
exports.LambdaCronStack = LambdaCronStack;
const app = new cdk.App();
new LambdaCronStack(app, "LambdaCronExample");
app.run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE4QztBQUM5Qyw4Q0FBOEM7QUFDOUMsb0NBQW9DO0FBRXBDLHlCQUF5QjtBQUV6QixNQUFhLGVBQWdCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDNUMsWUFBWSxHQUFZLEVBQUUsRUFBVTtRQUNsQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBRWQsTUFBTSxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDdEQsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FDekIsRUFBRSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUM1RDtZQUNELE9BQU8sRUFBRSxlQUFlO1lBQ3hCLE9BQU8sRUFBRSxHQUFHO1lBQ1osT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUTtTQUNqQyxDQUFDLENBQUE7UUFFRiwyQkFBMkI7UUFDM0IsdUdBQXVHO1FBQ3ZHLE1BQU0sSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQzlDLGtCQUFrQixFQUFFLDBCQUEwQjtTQUMvQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFCLENBQUM7Q0FDRjtBQXBCRCwwQ0FvQkM7QUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUN6QixJQUFJLGVBQWUsQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLENBQUMsQ0FBQTtBQUM3QyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXZlbnRzID0gcmVxdWlyZShcIkBhd3MtY2RrL2F3cy1ldmVudHNcIilcbmltcG9ydCBsYW1iZGEgPSByZXF1aXJlKFwiQGF3cy1jZGsvYXdzLWxhbWJkYVwiKVxuaW1wb3J0IGNkayA9IHJlcXVpcmUoXCJAYXdzLWNkay9jZGtcIilcblxuaW1wb3J0IGZzID0gcmVxdWlyZShcImZzXCIpXG5cbmV4cG9ydCBjbGFzcyBMYW1iZGFDcm9uU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihhcHA6IGNkay5BcHAsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihhcHAsIGlkKVxuXG4gICAgY29uc3QgbGFtYmRhRm4gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiU2luZ2xldG9uXCIsIHtcbiAgICAgIGNvZGU6IG5ldyBsYW1iZGEuSW5saW5lQ29kZShcbiAgICAgICAgZnMucmVhZEZpbGVTeW5jKFwibGFtYmRhLWhhbmRsZXIuanNcIiwgeyBlbmNvZGluZzogXCJ1dGYtOFwiIH0pXG4gICAgICApLFxuICAgICAgaGFuZGxlcjogXCJpbmRleC5oYW5kbGVyXCIsXG4gICAgICB0aW1lb3V0OiAzMDAsXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5QeXRob24yN1xuICAgIH0pXG5cbiAgICAvLyBSdW4gZXZlcnkgZGF5IGF0IDZQTSBVVENcbiAgICAvLyBTZWUgaHR0cHM6Ly9kb2NzLmF3cy5hbWF6b24uY29tL2xhbWJkYS9sYXRlc3QvZGcvdHV0b3JpYWwtc2NoZWR1bGVkLWV2ZW50cy1zY2hlZHVsZS1leHByZXNzaW9ucy5odG1sXG4gICAgY29uc3QgcnVsZSA9IG5ldyBldmVudHMuRXZlbnRSdWxlKHRoaXMsIFwiUnVsZVwiLCB7XG4gICAgICBzY2hlZHVsZUV4cHJlc3Npb246IFwiY3JvbigwIDE4ID8gKiBNT04tRlJJICopXCJcbiAgICB9KVxuICAgIHJ1bGUuYWRkVGFyZ2V0KGxhbWJkYUZuKVxuICB9XG59XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKClcbm5ldyBMYW1iZGFDcm9uU3RhY2soYXBwLCBcIkxhbWJkYUNyb25FeGFtcGxlXCIpXG5hcHAucnVuKClcbiJdfQ==