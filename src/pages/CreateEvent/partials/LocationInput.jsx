import React, { useEffect, useState } from "react";
import { sEvent2, sLocation } from "../eventStore";
import axios from "axios";
import FormSection from "./FormSection";
import { useQuery } from "@tanstack/react-query";

const fetchProvinces = async () => {
  const { data } = await axios.get("https://provinces.open-api.vn/api/p/");
  return data;
};

const fetchDistricts = async (cityCode) => {
  if (!cityCode) return [];
  const { data } = await axios.get(
    `https://provinces.open-api.vn/api/p/${cityCode}?depth=2`
  );
  return data.districts;
};

const fetchWards = async (districtCode) => {
  if (!districtCode) return [];
  const { data } = await axios.get(
    `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
  );
  return data.wards;
};

export default function LocationInput() {
  const eventInfo = sEvent2.use();
  const locationInfo = sLocation.use();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const { data: provincesData } = useQuery({
    queryKey: ["provinces"],
    queryFn: fetchProvinces,
    staleTime: Infinity,
  });

  const { data: districtsData } = useQuery({
    queryKey: ["districts", locationInfo.province_code],
    queryFn: () => fetchDistricts(locationInfo.province_code),
    enabled: !!locationInfo.province_code,
    staleTime: Infinity,
  });

  const { data: wardsData } = useQuery({
    queryKey: ["wards", locationInfo.district_code],
    queryFn: () => fetchWards(locationInfo.district_code),
    enabled: !!locationInfo.district_code,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (provincesData) setProvinces(provincesData);
  }, [provincesData]);

  useEffect(() => {
    if (districtsData) {
      setDistricts(districtsData);
    } else {
      setDistricts([]);
    }
  }, [districtsData, locationInfo.province_code]);

  useEffect(() => {
    if (wardsData) {
      setWards(wardsData);
    } else {
      setWards([]);
    }
  }, [wardsData, locationInfo.district_code]);

  const handleEventTypeChange = (e) => {
    const newFormat = e.target.value;
    sEvent2.set((pre) => {
      pre.value.event_format = newFormat;
      if (newFormat === "online") {
        pre.value.venue_name = "";
        pre.value.city = "";
        pre.value.district = "";
        pre.value.ward = "";
        pre.value.street_name = "";
        // Reset sLocation về trạng thái ban đầu
        sLocation.set({
          province: "",
          province_code: 0,
          district: "",
          district_code: 0,
          ward: "",
          ward_code: 0,
        });
      }
      return pre;
    });
  };

  const handleProvinceChange = (e) => {
    const selectedCode = Number(e.target.value);
    const selectedProvince = provinces.find((p) => p.code === selectedCode);

    const newLocationState = {
      province: selectedProvince ? selectedProvince.name : "",
      province_code: selectedProvince ? selectedProvince.code : 0,
      district: "",
      district_code: 0,
      ward: "",
      ward_code: 0,
    };

    sLocation.set(newLocationState);

    sEvent2.set((pre) => {
      pre.value.city = newLocationState.province;
      pre.value.district = "";
      pre.value.ward = "";
      return pre;
    });
  };

  const handleDistrictChange = (e) => {
    const selectedCode = Number(e.target.value);
    const selectedDistrict = districts.find((d) => d.code === selectedCode);

    const currentProvince = locationInfo.province;
    const currentProvinceCode = locationInfo.province_code;

    const newLocationState = {
      province: currentProvince,
      province_code: currentProvinceCode,
      district: selectedDistrict ? selectedDistrict.name : "",
      district_code: selectedDistrict ? selectedDistrict.code : 0,
      ward: "",
      ward_code: 0,
    };

    sLocation.set(newLocationState);

    sEvent2.set((pre) => {
      pre.value.district = newLocationState.district;
      pre.value.ward = "";
      return pre;
    });
  };

  const handleWardChange = (e) => {
    const selectedCode = Number(e.target.value);
    const selectedWard = wards.find((w) => w.code === selectedCode);

    const currentProvince = locationInfo.province;
    const currentProvinceCode = locationInfo.province_code;
    const currentDistrict = locationInfo.district;
    const currentDistrictCode = locationInfo.district_code;

    const newLocationState = {
      province: currentProvince,
      province_code: currentProvinceCode,
      district: currentDistrict,
      district_code: currentDistrictCode,
      ward: selectedWard ? selectedWard.name : "",
      ward_code: selectedWard ? selectedWard.code : 0,
    };

    sLocation.set(newLocationState);

    sEvent2.set((pre) => {
      pre.value.ward = newLocationState.ward;
      return pre;
    });
  };

  return (
    <FormSection title="Địa chỉ sự kiện">
      <div className="flex items-center mb-2 text-white">
        <label className="flex items-center mr-4">
          <input
            type="radio"
            name="locationType"
            value="offline"
            checked={eventInfo.event_format === "offline"}
            onChange={handleEventTypeChange}
            className="mr-1"
          />
          Sự kiện offline
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="locationType"
            value="online"
            checked={eventInfo.event_format === "online"}
            onChange={handleEventTypeChange}
            className="mr-1"
          />
          Sự kiện online
        </label>
      </div>

      {eventInfo.event_format === "offline" && (
        <div className="space-y-4">
          <label className="text-white block">
            <span className="text-[#C83030] font-bold text-lg">* </span>Tên địa
            điểm
            <input
              spellCheck="false"
              type="text"
              className="w-full p-2 mt-2 bg-white outline-none text-black border border-gray-600 rounded"
              value={eventInfo.venue_name}
              onChange={(e) =>
                sEvent2.set((pre) => {
                  pre.value.venue_name = e.target.value;
                  return pre;
                })
              }
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-white block">
              <span className="text-[#C83030] font-bold text-lg">* </span>
              Tỉnh/Thành
              <select
                className="p-2 w-full mt-2 bg-white text-black outline-none border border-gray-600 rounded"
                value={locationInfo.province_code || ""}
                onChange={handleProvinceChange}
              >
                <option value="">Chọn Tỉnh/Thành</option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-white block">
              <span className="text-[#C83030] font-bold text-lg">* </span>
              Quận/Huyện
              <select
                className="p-2 w-full mt-2 bg-white text-black outline-none border border-gray-600 rounded"
                value={locationInfo.district_code || ""}
                onChange={handleDistrictChange}
                disabled={!locationInfo.province_code}
              >
                <option value="">Chọn Quận/Huyện</option>
                {districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-white block">
              <span className="text-[#C83030] font-bold text-lg">* </span>
              Phường/Xã
              <select
                className="p-2 w-full mt-2 bg-white text-black outline-none border border-gray-600 rounded"
                value={locationInfo.ward_code || ""}
                onChange={handleWardChange}
                disabled={!locationInfo.district_code}
              >
                <option value="">Chọn Phường/Xã</option>
                {wards.map((ward) => (
                  <option key={ward.code} value={ward.code}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-white block">
              <span className="text-[#C83030] font-bold text-lg">* </span>Số
              nhà, đường
              <input
                spellCheck="false"
                type="text"
                className="p-2 w-full mt-2 bg-white text-black outline-none border border-gray-600 rounded"
                value={eventInfo.street_name}
                onChange={(e) =>
                  sEvent2.set((pre) => {
                    pre.value.street_name = e.target.value;
                    return pre;
                  })
                }
              />
            </label>
          </div>
        </div>
      )}
    </FormSection>
  );
}
