// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */
// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: 8HMNFKnEv7gJ55SbTqvTiU
// Component: 4PjNop8mQb
import * as React from "react";
import { useRouter } from "next/router";
import * as p from "@plasmicapp/react-web";
import * as ph from "@plasmicapp/host";
import {
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts
} from "@plasmicapp/react-web";
import "@plasmicapp/react-web/lib/plasmic.css";
import projectcss from "./plasmic_im_xbeanies.module.css"; // plasmic-import: 8HMNFKnEv7gJ55SbTqvTiU/projectcss
import sty from "./PlasmicRoundBlackButton.module.css"; // plasmic-import: 4PjNop8mQb/css

export const PlasmicRoundBlackButton__VariantProps = new Array();

export const PlasmicRoundBlackButton__ArgProps = new Array();

const __wrapUserFunction =
  globalThis.__PlasmicWrapUserFunction ?? ((loc, fn) => fn());

const __wrapUserPromise =
  globalThis.__PlasmicWrapUserPromise ??
  (async (loc, promise) => {
    return await promise;
  });

function useNextRouter() {
  try {
    return useRouter();
  } catch {}
  return undefined;
}

function PlasmicRoundBlackButton__RenderFunc(props) {
  const { variants, overrides, forNode } = props;
  const __nextRouter = useNextRouter();
  const $ctx = ph.useDataEnv?.() || {};
  const args = React.useMemo(() => Object.assign({}, props.args), [props.args]);
  const $props = {
    ...args,
    ...variants
  };
  const refsRef = React.useRef({});
  const $refs = refsRef.current;
  const currentUser = p.useCurrentUser?.() || {};
  const [$queries, setDollarQueries] = React.useState({});
  return (
    <button
      data-plasmic-name={"rectangle9"}
      data-plasmic-override={overrides.rectangle9}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(
        projectcss.all,
        projectcss.button,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_mixins,
        sty.rectangle9
      )}
      ref={ref => {
        $refs["rectangle9"] = ref;
      }}
    >
      {true ? (
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text__drpTz
          )}
        >
          {"Coming Soon!"}
        </div>
      ) : null}

      <div
        className={classNames(
          projectcss.all,
          projectcss.__wab_text,
          sty.text__yXpI2
        )}
      >
        {"</imnotArt> Wallet"}
      </div>
    </button>
  );
}

const PlasmicDescendants = {
  rectangle9: ["rectangle9"]
};

function makeNodeComponent(nodeName) {
  const func = function (props) {
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: [...PlasmicDescendants[nodeName]],
          internalArgPropNames: PlasmicRoundBlackButton__ArgProps,
          internalVariantPropNames: PlasmicRoundBlackButton__VariantProps
        }),
      [props, nodeName]
    );

    return PlasmicRoundBlackButton__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "rectangle9") {
    func.displayName = "PlasmicRoundBlackButton";
  } else {
    func.displayName = `PlasmicRoundBlackButton.${nodeName}`;
  }
  return func;
}

export const PlasmicRoundBlackButton = Object.assign(
  // Top-level PlasmicRoundBlackButton renders the root element
  makeNodeComponent("rectangle9"),
  {
    // Helper components rendering sub-elements
    // Metadata about props expected for PlasmicRoundBlackButton
    internalVariantProps: PlasmicRoundBlackButton__VariantProps,
    internalArgProps: PlasmicRoundBlackButton__ArgProps
  }
);

export default PlasmicRoundBlackButton;
/* prettier-ignore-end */
