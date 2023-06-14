import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { signIn } from "next-auth/react";

type Props = {
  name: string;
};

const iconMapping: { [key: string]: IconDefinition } = {
  Google: faGoogle,
  Facebook: faFacebook,
  // Add more mappings here as needed
};

function Button({ name }: Props) {
  const icon = iconMapping[name];
  return (
    <button
      onClick={() => signIn(name.toLocaleLowerCase())}
      className="border-2 py-3 rounded shadow-md"
    >
      <FontAwesomeIcon className="mr-1" icon={icon} /> Sign In with {name}
    </button>
  );
}

export default Button;
