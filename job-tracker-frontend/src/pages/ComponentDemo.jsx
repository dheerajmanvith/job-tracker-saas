import { useEffect, useState } from "react";

import ApplicationCard from "../components/ApplicationCard";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import StatusBadge from "../components/StatusBadge";

function ComponentDemo() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  // Runs whenever count changes
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <h1 className="text-center text-4xl font-bold text-gray-800">
          React Component Demo
        </h1>

        {/* Buttons */}
        <Card title="Button Component">
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>

            <Button variant="secondary">
              Secondary
            </Button>

            <Button variant="success">
              Success
            </Button>

            <Button variant="danger">
              Danger
            </Button>

            <Button disabled>
              Disabled
            </Button>
          </div>
        </Card>

        {/* Input */}
        <Card title="Input Component">
          <div className="space-y-4">
            <Input
              label="Your Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <p className="text-gray-700">
              You typed:{" "}
              <span className="font-semibold">
                {name || "Nothing yet"}
              </span>
            </p>
          </div>
        </Card>

        {/* Badge */}
        <Card title="Badge Component">
          <div className="flex flex-wrap gap-3">
            <Badge color="blue">Applied</Badge>
            <Badge color="yellow">Interview</Badge>
            <Badge color="green">Offer</Badge>
            <Badge color="red">Rejected</Badge>
            <Badge color="gray">Archived</Badge>
            <Badge color="purple">Featured</Badge>
            <Badge color="indigo">Remote</Badge>
          </div>
        </Card>

        {/* Status Badge */}
        <Card title="StatusBadge Component">
          <div className="flex flex-wrap gap-3">
            <StatusBadge status="Applied" />
            <StatusBadge status="Phone Screen" />
            <StatusBadge status="Interview" />
            <StatusBadge status="Offer" />
            <StatusBadge status="Rejected" />
            <StatusBadge status="Archived" />
          </div>
        </Card>

        {/* useEffect */}
        <Card title="useEffect Demo">
          <div className="space-y-4">
            <p className="text-lg">
              Current Count:
              <span className="ml-2 font-bold text-blue-600">
                {count}
              </span>
            </p>

            <Button
              onClick={() => setCount((prev) => prev + 1)}
            >
              Increment Count
            </Button>

            <p className="text-sm text-gray-500">
              Open your browser tab. The page title changes every
              time you click the button.
            </p>
          </div>
        </Card>

        {/* Application Cards */}
        <Card title="ApplicationCard Component">
          <div className="grid gap-6 md:grid-cols-2">
            <ApplicationCard
              company="Google"
              position="Frontend Developer"
              location="Bangalore"
              status="Interview"
              appliedDate="10 July 2026"
              onEdit={() => alert("Edit Google")}
              onDelete={() => alert("Delete Google")}
            />

            <ApplicationCard
              company="Microsoft"
              position="Software Engineer"
              location="Hyderabad"
              status="Offer"
              appliedDate="05 July 2026"
              onEdit={() => alert("Edit Microsoft")}
              onDelete={() => alert("Delete Microsoft")}
            />

            <ApplicationCard
              company="Amazon"
              position="Full Stack Developer"
              location="Chennai"
              status="Applied"
              appliedDate="02 July 2026"
              onEdit={() => alert("Edit Amazon")}
              onDelete={() => alert("Delete Amazon")}
            />

            <ApplicationCard
              company="Netflix"
              position="Backend Developer"
              location="Remote"
              status="Rejected"
              appliedDate="25 June 2026"
              onEdit={() => alert("Edit Netflix")}
              onDelete={() => alert("Delete Netflix")}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ComponentDemo;