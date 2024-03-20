import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
function LoginRegister() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="h-screen w-screen bg-slate-50 flex justify-center items-center">
      <Card className="rounded-lg w-80">
        <CardContent className="p-6 ">
          {visible ? <Login /> : <Register />}
          <Button
            onClick={() => setVisible(!visible)}
            variant="outline"
            className="mt-2 w-full"
          >
            {visible ? "Register" : "Login"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginRegister;
