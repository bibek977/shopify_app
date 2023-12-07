import {
  TextField,
  IndexTable,
  LegacyCard,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
  ChoiceList,
  RangeSlider,
  Badge,
  Button,
  Spinner
} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';
import {useAppQuery} from '../hooks'
import CreateProduct from '../components/CreateProduct';
import { useQueryClient } from '@tanstack/react-query';
import EditProduct from '../components/EditProduct';
import UpdateProduct from '../components/UpdateProduct';

export default function Products() {
  const sleep = (ms) =>new Promise((resolve) => setTimeout(resolve, ms));

  const queryClient = useQueryClient()
  const queryCache = queryClient.getQueryCache()

  // const {data:ddata, isLoading}=useAppQuery({url:'api/products',tag : ['products'], reactQueryOptions:{
  //   // onSuccess:(data)=>console.log(data.filter((e)=>e.title=="gold star"))
  //   onSuccess:(data)=>console.log(data)
  // }})

  // const [title,setTitle] = useState('new shorts cotton')
  // const [title,setTitle] = useState('draft')
  const [searchTitle,setSearchTitle] = useState("")
  const [queryValue, setQueryValue] = useState('');
  // const [sortData,setSortData] = useState('')
  const [sortSelected, setSortSelected] = useState('TITLE ASC');
  useEffect(() => {
    let change;
    clearTimeout(change);
    change = setTimeout(() => {
      setSearchTitle(queryValue);
      // setSortData(sortSelected);
      sortSelected()
    }, 2000);
    return () => clearTimeout(change);
}, [queryValue]);
  // const {data:ddata, isLoading}=useAppQuery({url:`api/products?search=${queryValue}`,tag : ['products'], reactQueryOptions:{
  //   enabled:true,
  //   // onSuccess:(data)=>console.log(data.filter((e)=>e.title=="gold star"))
  //   onSuccess:(data)=>console.log(data)
  // }})
  
  // dinesh
  const URL = `/api/products?search=${searchTitle}&sort=${sortSelected}`
     const [url, setUrl] = useState(URL);

     useEffect(() => {
          setUrl(URL);
          setApiHit(true);
     }, [URL]);

     const [apiHit, setApiHit] = useState(true);

     const { data: ddata, isLoading } = useAppQuery({
          url: url,
          tag: ["products"],
          reactQueryOptions: {
               enabled: apiHit,
               keepPreviousData: true,
               onSuccess: (data) => {
                    console.log("data", data);
                    setApiHit(false);
               },
          },
     });
  // dinehs

  const {state:daata} = queryCache.find(['products'])

  const [data,setData]=useState(daata?.data);
  useEffect(()=>setData(daata?.data),[daata])
  // const {e_data} = useAppQuery({url:'api/products/edit',reactQueryOptions:{
  //   onSuccess:(e_data)=>console.log(data)}})

  // const edit = useCallback(() => {
  //   e_data
  // }, []);

  // const {del_data} = useAppQuery({url:'api/products/delete',reactQueryOptions:{
  //   onSuccess:(del_data)=>console.log(del_data)}})

  // const deleteProduct = (id)=>{
  //   console.log(id)
  // }
  

  const [itemStrings, setItemStrings] = useState([
    'All']);
  const deleteView = (index) => {
    const newItemStrings = [...itemStrings];
    newItemStrings.splice(index, 1);
    setItemStrings(newItemStrings);
    setSelected(0);
  };

  const duplicateView = async (name) => {
    setItemStrings([...itemStrings, name]);
    setSelected(itemStrings.length);
    await sleep(1);
    return true;
  };

  const tabs = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => {},
    id: `${item}-${index}`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
            {
              type: 'rename',
              onAction: () => {},
              onPrimaryAction: async (value)=> {
                const newItemsStrings = tabs.map((item, idx) => {
                  if (idx === index) {
                    return value;
                  }
                  return item.content;
                });
                await sleep(1);
                setItemStrings(newItemsStrings);
                return true;
              },
            },
            {
              type: 'duplicate',
              onPrimaryAction: async (value)=> {
                await sleep(1);
                duplicateView(value);
                return true;
              },
            },
            {
              type: 'edit',
            },
            {
              type: 'delete',
              onPrimaryAction: async () => {
                await sleep(1);
                deleteView(index);
                return true;
              },
            },
          ],
  }));
  const [selected, setSelected] = useState(0);
  const onCreateNewView = async (value) => {
    await sleep(500);
    setItemStrings([...itemStrings, value]);
    setSelected(itemStrings.length);
    return true;
  };
  const sortOptions= [
    {label: 'TITLE', value: 'TITLE ASC', directionLabel: 'Ascending'},
    {label: 'TITLE', value: 'TITLE DESC', directionLabel: 'Descending'},
    {label: 'VENDOR', value:'VENDOR ASC', directionLabel: 'Ascending'},
    {label: 'VENDOR', value:'VENDOR DESC', directionLabel: 'Descending'},
    // {label: 'CREATED_AT', value: 'CREATED_AT ASC', directionLabel: 'Ascending'},
    // {label: 'CREATED_AT', value: 'CREATED_AT DESC', directionLabel: 'Descending'},
    // {label: 'UPDATED_AT', value: 'UPDATED_AT ASC', directionLabel: 'Ascending'},
    // {label: 'UPDATED_AT', value: 'UPDATED_AT DESC', directionLabel: 'Descending'},
  ];

  const {mode, setMode} = useSetIndexFiltersMode();
  const onHandleCancel = () => {};

  const onHandleSave = async () => {
    await sleep(1);
    return true;
  };

  const primaryAction=
    selected === 0
      ? {
          type: 'save-as',
          onAction: onCreateNewView,
          disabled: false,
          loading: false,
        }
      : {
          type: 'save',
          onAction: onHandleSave,
          disabled: false,
          loading: false,
        };
  const [accountStatus, setAccountStatus] = useState(
    undefined,
  );
  const [moneySpent, setMoneySpent] = useState(
    undefined,
  );
  const [taggedWith, setTaggedWith] = useState('');
  

  const handleAccountStatusChange = useCallback(
    (value) => setAccountStatus(value),
    [],
  );
  const handleMoneySpentChange = useCallback(
    (value) => setMoneySpent(value),
    [],
  );
  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    [],
  );
  const handleAccountStatusRemove = useCallback(
    () => setAccountStatus(undefined),
    [],
  );
  const handleMoneySpentRemove = useCallback(
    () => setMoneySpent(undefined),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(''), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleMoneySpentRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleAccountStatusRemove,
    handleMoneySpentRemove,
    handleQueryValueRemove,
    handleTaggedWithRemove,
  ]);

  const filters = [
    {
      key: 'accountStatus',
      label: 'Account status',
      filter: (
        <ChoiceList
          title="Account status"
          titleHidden
          choices={[
            {label: 'Enabled', value: 'enabled'},
            {label: 'Not invited', value: 'not invited'},
            {label: 'Invited', value: 'invited'},
            {label: 'Declined', value: 'declined'},
          ]}
          selected={accountStatus || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'taggedWith',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: 'moneySpent',
      label: 'Money spent',
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={moneySpent || [0, 500]}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={handleMoneySpentChange}
        />
      ),
    },
  ];

  const appliedFilters = [];
  if (accountStatus && !isEmpty(accountStatus)) {
    const key = 'accountStatus';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, accountStatus),
      onRemove: handleAccountStatusRemove,
    });
  }
  if (moneySpent) {
    const key = 'moneySpent';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, moneySpent),
      onRemove: handleMoneySpentRemove,
    });
  }
  if (!isEmpty(taggedWith)) {
    const key = 'taggedWith';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, taggedWith),
      onRemove: handleTaggedWithRemove,
    });
  }

  const orders = [
    {
      id: '1020',
      order: (
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          #1020
        </Text>
      ),
      date: 'Jul 20 at 4:34pm',
      customer: 'Jaydon Stanton',
      total: '$969.44',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
  ];
  const resourceName = {
    singular: 'product',
    plural: 'productss',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(orders);
    // console.log(selectedResources);


  const rowMarkup = data?.map(
    (
      {id,title,vendor,updated_at,published_at,status},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {id}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{title}</IndexTable.Cell>
        <IndexTable.Cell>{status}</IndexTable.Cell>
        <IndexTable.Cell>{updated_at}</IndexTable.Cell>
        <IndexTable.Cell>{published_at}</IndexTable.Cell>
        <IndexTable.Cell>{vendor}</IndexTable.Cell>
        {/* <IndexTable.Cell><Button variant="primary" onClick={edit}>Delete {title}</Button></IndexTable.Cell> */}
        {/* <IndexTable.Cell><Button variant="primary" onClick={()=>deleteProduct(id)}>Delete {title}</Button></IndexTable.Cell> */}
        <IndexTable.Cell>

        <EditProduct data = {id} />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <UpdateProduct data={id} prevData={[title, vendor, status]} />
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <CreateProduct/>
      <IndexFilters
        sortOptions={sortOptions}
        sortSelected={sortSelected}
        queryValue={queryValue}
        queryPlaceholder="Searching in all"
        onQueryChange={handleFiltersQueryChange}
        onQueryClear={() => setQueryValue('')}
        onSort={setSortSelected}
        primaryAction={primaryAction}
        cancelAction={{
          onAction: onHandleCancel,
          disabled: false,
          loading: false,
        }}
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
        canCreateNewView
        onCreateNewView={onCreateNewView}
        filters={filters}
        appliedFilters={appliedFilters}
        onClearAll={handleFiltersClearAll}
        mode={mode}
        setMode={setMode}
      />
      <IndexTable
        resourceName={resourceName}
        itemCount={orders.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {title: 'Product Id'},
          {title: 'Title'},
          {title: 'Status'},
          {title: 'Updated At'},
          {title: 'Created At'},
          {title: 'Vendor'},
        ]}
      >
        {isLoading && <Spinner accessibilityLabel="Spinner example" size="large" />}
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );

  function disambiguateLabel(key, value ) {
    switch (key) {
      case 'moneySpent':
        return `Money spent is between $${value[0]} and $${value[1]}`;
      case 'taggedWith':
        return `Tagged with ${value}`;
      case 'accountStatus':
        return (value ).map((val) => `Customer ${val}`).join(', ');
      default:
        return value ;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
}


