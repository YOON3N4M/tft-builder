import { fetchTacticianData } from "@/app/services/riot";
import { TACTICIAN_ICON_URL } from "@/constants/url";
import Image from "next/image";

interface CompanionPortraitProps {
  id: string;
}

async function CompanionPortrait(props: CompanionPortraitProps) {
  const { id } = props;

  const tactician = await fetchTacticianData(id);

  if (!tactician) return;
  return (
    <div className="w-[64px] h-[64px] flex items-center justify-center rounded-full overflow-hidden border-2 border-tier-5">
      <Image
        src={TACTICIAN_ICON_URL(tactician?.image.full)}
        width={512}
        height={344}
        alt={tactician?.name}
        className="object-cover scale-150"
      />
    </div>
  );
}

export default CompanionPortrait;
