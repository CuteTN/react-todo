import React from "react";
import { Button } from "../../common/components/Button.component";
import { useAppI18n } from "../../common/i18n/I18nProvider.context";
import { useAppNavigate } from "../../common/routers/navigate.hook";
import { ArrowRightIcon } from "../../common/components/Icons.components";

export function HomePage() {
  const { fm } = useAppI18n();
  const navigate = useAppNavigate();

  const handleNavigateToTasksList = React.useCallback(() => {
    navigate("tasksList");
  }, [navigate]);

  return (
    <div className="fixed flex items-center justify-center align-middle w-full h-full">
      <Button variant="contained" color="primary" endIcon={<ArrowRightIcon />} onClick={handleNavigateToTasksList}>
        {fm("common.goTo")} {fm("common.tasksList")}
      </Button>
    </div>
  );
}
