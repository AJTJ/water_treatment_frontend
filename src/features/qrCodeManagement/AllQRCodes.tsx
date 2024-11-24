import React from "react";
import { useGetManyQRCodes } from "common/hooks/useQRCode";
import { getManyQRCodesForPrinting } from "common/services/qrCodeService";
import { exportToCSV } from "common/services/exportToCSV";

const AllQRCodes: React.FC = () => {
  const { qrCodeList, isLoading, isError } = useGetManyQRCodes();
  const [csvRange, setCsvRange] = React.useState<
    [number | undefined, number | undefined]
  >([undefined, undefined]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  const sortedQRCodes = qrCodeList?.qrCodes?.sort(
    (a, b) => b.batch_number - a.batch_number
  );

  const loadQRCodesForPrinting = async () => {
    if (csvRange[0] !== undefined && csvRange[1] !== undefined) {
      const qrCodeResponse = await getManyQRCodesForPrinting(
        csvRange[0],
        csvRange[1]
      );
      exportToCSV(qrCodeResponse.qrCodes);
    } else {
      console.error("Invalid CSV range");
    }
  };

  return (
    <div>
      <div>
        {sortedQRCodes?.map((qrcode) => (
          <div key={qrcode.id}>
            <p>{qrcode.batch_number}</p>
            <p>{qrcode.item_name}</p>
          </div>
        ))}
      </div>
      <div>
        <div>
          <input
            type="number"
            placeholder="Start"
            value={csvRange?.[0] || ""}
            onChange={(e) =>
              setCsvRange([parseInt(e.target.value), csvRange?.[1] || 0])
            }
          />
          <input
            type="number"
            placeholder="End"
            value={csvRange?.[1] || ""}
            onChange={(e) =>
              setCsvRange([csvRange?.[0] || 0, parseInt(e.target.value)])
            }
          />

          <button onClick={() => loadQRCodesForPrinting()}>Download CSV</button>
        </div>
      </div>
    </div>
  );
};

export default AllQRCodes;
