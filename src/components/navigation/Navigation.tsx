import { useState } from "react";
import Link from "next/link";
import { faBars, faRandom, faSearch, faTimes, faTv, faUser } from "@fortawesome/pro-solid-svg-icons";
import {
    StyledCollapsibleLink,
    StyledLogo,
    StyledLogoContainer,
    StyledMobileToggle,
    StyledNavigation,
    StyledNavigationContainer,
    StyledNavigationLinks
} from "./Navigation.style";
import { Button } from "components/button";
import { Icon } from "components/icon";
import { Text } from "components/text";
import useCurrentSeason from "hooks/useCurrentSeason";
import navigateToRandomTheme from "utils/navigateToRandomTheme";
import { useRouter } from "next/router";

interface NavigationProps {
    offsetToggleButton?: boolean
}

export function Navigation({ offsetToggleButton = false }: NavigationProps) {
    const [ show, setShow ] = useState(false);
    const { currentYear, currentSeason } = useCurrentSeason();

    const router = useRouter();
    const [ prevPathname, setPrevPathname ] = useState(router.pathname);

    // If the user clicks on a link which sends them to another page,
    // we want to close the modal navigation.
    if (router.pathname !== prevPathname) {
        setShow(false);
        setPrevPathname(router.pathname);
        return null;
    }

    return <>
        <StyledNavigation show={show} onClick={() => setShow(false)}>
            <StyledNavigationContainer onClick={(event) => event.stopPropagation()}>
                <Link href="/" passHref legacyBehavior>
                    <StyledLogoContainer>
                        <StyledLogo width="277" height="150"/>
                    </StyledLogoContainer>
                </Link>
                <StyledNavigationLinks>
                    <Link href="/search" passHref legacyBehavior>
                        <Button as="a" variant="silent" style={{ "--gap": "8px" }}>
                            <Icon icon={faSearch}/>
                            <Text>Search</Text>
                        </Button>
                    </Link>
                    <Button variant="silent" style={{ "--gap": "8px" }} onClick={navigateToRandomTheme}>
                        <Icon icon={faRandom}/>
                        <Text>Play Random</Text>
                    </Button>
                    <Link
                        href={(currentYear && currentSeason) ? `/year/${currentYear}/${currentSeason}` : "/"}
                        passHref
                        legacyBehavior>
                        <Button as="a" variant="silent" style={{ "--gap": "8px" }}>
                            <Icon icon={faTv}/>
                            <Text>Current Season</Text>
                        </Button>
                    </Link>
                    <Link href="/profile" passHref legacyBehavior>
                        <StyledCollapsibleLink forwardedAs="a" title="My Profile">
                            <Icon icon={faUser}/>
                            <span>My Profile</span>
                        </StyledCollapsibleLink>
                    </Link>
                </StyledNavigationLinks>
            </StyledNavigationContainer>
        </StyledNavigation>

        <StyledMobileToggle
            variant={show ? "solid" : "primary"}
            isCircle
            offsetToggleButton={offsetToggleButton}
            onClick={() => setShow(!show)}
        >
            <Icon icon={show ? faTimes : faBars}/>
        </StyledMobileToggle>
    </>;
}
