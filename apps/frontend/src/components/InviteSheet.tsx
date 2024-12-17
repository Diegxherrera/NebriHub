import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function InviteSheet() {
  const [invitedEmail, setInvitedEmail] = useState<string>("");
  return (
    <div className="mt-3 mb-4 gap-2">
      <Label>Enviar invitación</Label>
      <Input
        id="email"
        type="email"
        placeholder="correo@madrid.es"
        value={invitedEmail}
        onChange={(e) => setInvitedEmail(e.target.value)}
        required
      />
      <Button
        onClick={() => {}}
        type="submit"
        variant="secondary"
        className="mt-3"
      >
        {" "}
        Invitar{" "}
      </Button>
    </div>
  );
}
