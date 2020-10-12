import React, { useContext } from "react";

import useMenu from "../../hooks/use-menu";
import { newURLWithOrigin } from "../../utils/url";

const LinkItem = ({ link }) => {
  const target = newURLWithOrigin(link.href, window.location);
  target.searchParams.delete("_format");
  return (
    <li>
      <a
        {...{
          href: target.toString(),
          title: link.description,
          onClick: (e) => {
            e.preventDefault();
            link.follow();
          },
        }}
      >
        {link.title}
      </a>
      <LinkItems links={link.children || []} />
    </li>
  );
};

const LinkItems = ({ links }) => {
  const items = links.map((link, key) => <LinkItem {...{ key, link }} />);
  return items.length ? <ul>{items}</ul> : null;
};

export default () => {
  const { tree, loading } = useMenu("main");

  if (loading || !tree) {
    return null;
  }

  return (
    <nav>
      <LinkItems links={tree} />
    </nav>
  );
};
